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
      // amountPaid: this.props.user.amount_paid
    }

    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.dispatch(Actions.mySubmissions(this.props.user.id))
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
     if (prevProps.user.id !== this.props.user.id) {
       this.props.dispatch(Actions.mySubmissions(this.props.user.id))
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
      } else {
        prevArray.push(name)
        this.setState({
          publishArray: prevArray
        })
      }

      // Calculate based on if somethign already paid... TO do
      if (this.state.publishArray.length > 0 && this.state.publishArray.length <= 3) {
        this.setState({amountOwed:2500})
      } else if (this.state.publishArray.length > 3) {
        var amount = 25
        var loop = this.state.publishArray.length - 3

        for (var i = 0; i < loop; i++ ) {
          amount = amount + 500
        }
        this.setState({amountOwed:amount})
      }

    }

   mySubmissions(props) {
     const ms = this.props.mySubmissions;
     const unapproved = ms.filter(function(thing) {
       return thing.approved != true
     })
     const unapprovedItems = unapproved.map((item) =>
     <label key={item.id}>
         <input
           name={item.id}
           type="checkbox"
           // checked={this.state.isPublishing}
           onChange={this.handleInputChange} />
           Submission #0{item.id}
       </label>
     );
     return (
       <div>
        <h2>Unpublished Submissions</h2>
        <ul>{unapprovedItems}</ul>
      </div>
     );
   }

   firstPayment = () => {
     // If publish array length and amount already paid is 0
     if (this.state.publishArray.length > 0) {
       return <div className="line-item"><span>First 3 Designs</span><span>$25</span></div>
     }
   }

   additionalPayments = () => {
     if (this.state.publishArray.length > 3) {
       var iterNumber = this.state.publishArray.length - 3
       for (var i=0;i<iterNumber;i++) {

         //this.setState({amountOwed:this.state.amountOwed + 5})
         return <div className="line-item"><span>Additional Design</span><span>$5</span></div>
       }
     }
   }

   submit = (token) => {
     this.props.dispatch(Actions.charge(token, this.state.amountOwed, this.props.user.id, this.state.publishArray))
   }


  render() {
    return (
      <div className="submissions">
        <Header />
        <div className="body-container">
          <div className="copy-container">
            <h2>Finalize Submissions</h2>
            {this.mySubmissions()}
            <hr />
            {this.firstPayment()}
            {this.additionalPayments()}
            <hr />
            <div className="line-item">
              <span>Subtotal</span>
              <span>${this.state.amountOwed}</span>
            </div>
            <StripeCheckout
              token={this.submit}
              stripeKey="pk_test_CjH0FsjusiwdkHtuILI96lTO"
              currency="USD"
              zipCode={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  mySubmissions: state.mySubmissions
})

export default connect(mapStateToProps)(cssModules(Finalize, style))
