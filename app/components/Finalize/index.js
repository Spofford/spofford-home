import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import { finalizeSubmissions, mySubmissions, couponCharge, stripeCharge } from "../../redux/actions"
import { connect } from "react-redux"
import { Link, Redirect } from 'react-router-dom'
import classNames from 'classnames';
import StripeCheckout from 'react-stripe-checkout';

export class Finalize extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publishArray: [],
      amountOwed: 0,
      amountPaid: 0,
      finalAmount: 0,
      isLoaded: false,
      redirect: false,
      userRedirect: false,
      discount: 0,
      extrasList: [],
      couponCode: ""
    }

    this.submit = this.submit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.content(this.props.user.id)
      this.setModel()
    }
    if (!this.props.user.id || this.props.user.id == null) {
      this.setState({
        userRedirect: true
      })
    }
  }

  componentDidUpdate(prevProps) {
     if (prevProps.user.id !== this.props.user.id) {
       this.props.content(this.props.user.id)
       this.setModel()
     }

     if (prevProps.charge.id != this.props.charge.id) {
       var self = this;
       this.props.finalizeSubmissions(this.state.publishArray, this.props.user.id)
       setTimeout(function(){
         self.setState({
           redirect:true
         })
       }, 100)
     }
     if (prevProps.user.id && prevProps.user.id != this.props.user.id) {
       this.setState({
         redirect: true
       })
     }

   }

   setModel = (props) => {
     var totalPaid = 0
     var self = this

     if (this.props.user.charges.length>0) {
       for (var i = 0; i < this.props.user.charges.length; i++) {
         if (i===this.props.user.charges.length-1) {
           totalPaid = totalPaid + this.props.user.charges[i].amount
           this.setState({
             isLoaded:true,
             amountPaid:totalPaid
           })
         } else {
           totalPaid = totalPaid + this.props.user.charges[i].amount
         }
       }
     } else {
       this.setState({
         isLoaded:true
       })
     }
   }



   handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;

      const prevArray = this.state.publishArray

      if (prevArray.includes(name)) {
        var index = prevArray.indexOf(name);
        var element = this.state.extrasList.findIndex(function(div) {
          return div.key == name
        })
        if (index > -1) {
          prevArray.splice(index, 1);
          this.state.extrasList.splice(element,1)
        }

        this.setState({
          publishArray: prevArray
        })

        if (this.state.amountPaid > 0) {
          const ms = this.props.mySubmissions;
          const approved = ms.filter(function(thing) {
            return thing.approved == true
          })
          if (approved.length <= 3) {
            this.setState({
              amountOwed:0,
              finalAmount:0
            })
          } else {
            amount = this.state.amountOwed
            amount = amount - 500
            this.setState({
              amountOwed:amount,
              finalAmount:amount-this.state.discount
            })
          }
        } else {
          if (this.state.publishArray.length > 3) {
            amount = this.state.amountOwed
            amount = amount - 500
            this.setState({
              amountOwed:amount,
              finalAmount:amount-this.state.discount
            })
          } else if (this.state.publishArray.length <= 3 && this.state.publishArray.length > 0) {
            // Do nothing

          } else if (this.state.publishArray.length == 0) {
            amount = 0
            this.setState({
              amountOwed:amount,
              finalAmount:amount
            })
          }

        }

      } else {
        prevArray.push(name)
        this.setState({
          publishArray: prevArray
        })

        if (this.state.amountPaid > 0) {
          var self = this;
          const ms = this.props.mySubmissions;
          const approved = ms.filter(function(thing) {
            return thing.approved == true
          })

          if (approved.length < 3) {

            if (3 - this.state.publishArray.length - approved.length >= 0) {
              this.setState({
                amountOwed:0,
                finalAmount:0
              })
              this.state.extrasList.push(<div key={name} id={name} className="line-item"><span>Already Paid</span><span>$0</span></div>)
            } else {
              amount = this.state.amountOwed
              amount = amount + 500
              this.setState({
                amountOwed:amount,
                finalAmount:amount-this.state.discount
              })
              this.state.extrasList.push(<div key={name} id={name} className='line-item'><span>Additional Design</span><span>$5</span></div>)
            }
            //() => )
          } else {
            amount = this.state.amountOwed
            amount = amount + 500
            this.setState({
              amountOwed:amount,
              finalAmount:amount-this.state.discount
            })
            this.state.extrasList.push(<div key={name} id={name} className='line-item'><span>Additional Design</span><span>$5</span></div>)
          }
        } else {
          if (this.state.publishArray.length > 0 && this.state.publishArray.length <= 3) {
            this.setState({
              amountOwed:2500,
              finalAmount:2500-this.state.discount
            })
          } else if (this.state.publishArray.length > 3) {
            var amount = 2500
            var loop = this.state.publishArray.length - 3

            for (var i = 0; i < loop; i++ ) {
              amount = amount + 500
            }
            this.setState({
              amountOwed:amount,
              finalAmount:amount-this.state.discount
            })
          }
        }
      }

    }

   mySubmissions(props) {
     const ms = this.props.mySubmissions;
     const unapproved = ms.filter(function(thing) {
       return thing.approved != true
     })
     const unapprovedItems = unapproved.map((item) =>
     <div className="finalize-tile" key={item.id}>
        <img src={item.photo_url} />
        <label className="radio-container">
          <input type="checkbox" name={item.id} onChange={this.handleInputChange} />
          <span className="checkmark"></span>
          Submission #0{item.id}
        </label>
      </div>
     );
     return (
       <div className="tile-container">
        <h2>Unpublished Submissions</h2>
        <div>{unapprovedItems}</div>
      </div>
     );
   }

   firstPayment = () => {
     // If publish array length and amount already paid is 0
     if (this.state.publishArray.length > 0 && this.state.amountPaid == 0) {
       return <div className="line-item"><span>First 3 Designs</span><span>$25</span></div>
     }
   }

   additionalPayments = () => {

         return  <div>{ this.state.extrasList }</div>


   }

   handleChange = (event) => {
     this.setState({
       discount:0,
       finalAmount: this.state.amountOwed
     })
     if (event.target.value == "RISD" || event.target.value == "MECA" || event.target.value == "NBSS" || event.target.value == "MART" || event.target.value == "SGONG" || event.target.value == "MHUT" || event.target.value == "JHUC" || event.target.value == "AMEY" ) {
       if (this.state.amountPaid==0) {
         this.setState({
           couponCode: event.target.value,
           discount: 2500,
           finalAmount: this.state.amountOwed - 2500
         })
       }
     } if (event.target.value =="NOVV" && this.state.amountPaid==0) {
       if (this.state.finalAmount >= 1000) {
         this.setState({
           discount: 1000,
           finalAmount: this.state.amountOwed - 1000
         })
       }
     }
   }

   nullMessage = () => {
     if (this.state.publishArray.length == 0) {
       return (<div className="line-item">
         <span>No charges yet</span>
       </div>)
     }
   }

   checkoutButton = () => {
     if (this.state.amountOwed != 0) {
       if (this.state.finalAmount != 0) {
         return (
           <StripeCheckout
             token={this.submit}
             stripeKey={env.STRIPE_KEY}
             currency="USD"
             zipCode={true}
             amount={this.state.finalAmount}
           />
         )
       } else {

         return (
           <button className="green" onClick={this.noPayFinalize}>Publish</button>
         )
       }
     }
   }

   noPayFinalize = () => {
     this.props.createCoupon(this.state.amountOwed, this.props.user.id)
     /*
     setTimeout(function(){
       self.setState({
         redirect:true
       })
     }, 500)
     */
   }

   submit = (token) => {
     this.props.createStripe(token.id, this.state.amountOwed, this.props.user.id)
   }


  render() {
    if (this.state.userRedirect) {
      return <Redirect to='/login'/>;
    }


    if(this.state.redirect) {
      return <Redirect to={{
        pathname: '/submissions',
        state: { mySubmissions: this.props.mySubmissions}
      }} />;
    }


    if(this.state.isLoaded) {
      return (
        <div className="finalize">
          <Header />
          <div className="body-container">
            <div className="copy-container">
              {this.mySubmissions()}
              {this.nullMessage()}
              {this.firstPayment()}
              {this.additionalPayments()}
              <hr />
              <div className="line-item">
                <span>Subtotal</span>
                <span>${this.state.amountOwed*.01}</span>
              </div>
              <div className="line-item">
                <span>Coupon Code</span>
                <input className="input" id="coupon" type="text" maxLength="4" onChange={this.handleChange} />
              </div>
              <div className="line-item">
                <span>Discount</span>
                <span>${this.state.discount*.01}</span>
              </div>
              <hr />
              <div className="line-item">
                <span>Total</span>
                <span>${this.state.finalAmount*.01}</span>
              </div>
              {this.checkoutButton()}
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapDispatchToProps = {
  finalizeSubmissions: finalizeSubmissions,
  content: mySubmissions,
  createStripe: stripeCharge,
  createCoupon: couponCharge
};

const mapStateToProps = state => ({
  user: state.user,
  mySubmissions: state.mySubmissions,
  charge: state.charge
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Finalize, style))
