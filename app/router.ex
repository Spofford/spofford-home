defmodule PhoenixAuthenticationWeb.Router do
  use PhoenixAuthenticationWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :auth do
    plug PhoenixAuthentication.Auth.Pipeline
    plug :set_user_as_asset
  end

  scope "/", PhoenixAuthenticationWeb do
    pipe_through :browser

    get "/", PageController, :index

    get "/register", UserController, :new
    post "/register", UserController, :create
    
    get "/login", AuthController, :new
    post "/login", AuthController, :create
  end

  scope "/", PhoenixAuthenticationWeb do
    pipe_through [:browser, :auth]

    delete "/logout", AuthController, :delete

    resources "/me", UserController, only: [:show, :edit, :update], singleton: true
    
    get "/secretgarden", SecretGardenController, :index
  end

  def set_user_as_asset(conn, _) do
    user = conn |> PhoenixAuthentication.Auth.Guardian.Plug.current_resource
    IO.inspect user
    assign(conn, :current_user, user)    
  end
  
end
