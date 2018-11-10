import React from "react"
import ReactDOM from 'react-dom'
import cssModules from "react-css-modules"
import style from "./style.css"
import { default as Header } from "../Header"
import Actions from "../../redux/actions"
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
      discount: 0
    }

    this.submit = this.submit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.dispatch(Actions.mySubmissions(this.props.user.id))
      this.setModel()
    }
  }

  componentDidUpdate(prevProps) {
     if (prevProps.user.id !== this.props.user.id) {
       this.props.dispatch(Actions.mySubmissions(this.props.user.id))
       this.setModel()
     }

     if (prevProps.charge.id != this.props.charge.id) {
       var self = this;
       this.props.dispatch(Actions.finalizeSubmissions(this.state.publishArray))
       setTimeout(function(){
         self.setState({
           redirect:true
         })
       }, 500)
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
        if (index > -1) {
          prevArray.splice(index, 1);
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
          const ms = this.props.mySubmissions;
          const approved = ms.filter(function(thing) {
            return thing.approved == true
          })

          if (approved.length < 3) {
            this.setState({
              amountOwed:0,
              finalAmount:0
            })
          } else {
            amount = this.state.amountOwed
            amount = amount + 500
            this.setState({
              amountOwed:amount,
              finalAmount:amount-this.state.discount
            })
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
       var extras = this.state.publishArray
       if (this.state.amountPaid == 0) {
         if (this.state.publishArray.length > 3) {
           extras.length = extras.length - 3
           var extrasList = extras.map(function(thing){
                           return <div key={thing} className="line-item"><span>Additional Design</span><span>$5</span></div>;
                         })

           return  <div>{ extrasList }</div>
         }
       } else if (this.state.amountPaid > 0){
         const ms = this.props.mySubmissions;
         const approved = ms.filter(function(thing) {
           return thing.approved == true
         })

           var extrasList = extras.map(function(thing){
                          if (approved.length < 3) {
                            return <div key={thing} className="line-item"><span>Already Paid ({2-approved.length} remaining)</span><span>$0</span></div>;
                          } else {
                            return <div key={thing} className="line-item"><span>Additional Design</span><span>$5</span></div>;
                          }
                         })
         return  <div>{ extrasList }</div>
       }
   }

   handleChange = (event) => {
     this.setState({
       discount:0,
       finalAmount: this.state.amountOwed
     })
     if (event.target.value == "RISD" || event.target.value == "MECA" || event.target.value == "NBSS" || event.target.value == "MART" || event.target.value == "SGONG" || event.target.value == "MHUT" || event.target.value == "JHUC" || event.target.value == "AMEY" ) {
       if (this.state.amountPaid==0) {
         this.setState({
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
       } else {
         this.setState({
           discount: 500,
           finalAmount: 0
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
     if (this.state.finalAmount != 0 && this.state.finalAmount != this.state.discount) {
       return (
         <StripeCheckout
           token={this.submit}
           stripeKey="pk_test_CjH0FsjusiwdkHtuILI96lTO"
           currency="USD"
           zipCode={true}
         />
       )
     } else if (this.state.finalAmount == 0 && this.state.publishArray > 0) {

       return (
         <button className="green" onClick={this.noPayFinalize}>Publish</button>
       )
     }
   }

   noPayFinalize = () => {
     var self = this;
     this.props.dispatch(Actions.finalizeSubmissions(this.state.publishArray))
     setTimeout(function(){
       self.setState({
         redirect:true
       })
     }, 500)
   }

   submit = (token) => {
     this.props.dispatch(Actions.charge(token, this.state.amountOwed, this.props.user.id))
   }


  render() {

    if(this.state.redirect) {
      return <Redirect to={{
           pathname: '/submissions',
           state: { reload: true }
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

const mapStateToProps = state => ({
  user: state.user,
  mySubmissions: state.mySubmissions,
  charge: state.charge
})

export default connect(mapStateToProps)(cssModules(Finalize, style))
