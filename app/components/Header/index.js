import React from "react";
import FontAwesome from "react-fontawesome";
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import style from "./style.css";
import { Link, Redirect } from 'react-router-dom'
import { connect } from "react-redux"
import { logout } from "../../redux/actions"

let windowHeight = window.innerHeight

export class Header extends React.Component {

  constructor() {
    super()

    this.state = {
      scrolled: false,
      lastScrollTop: 0,
      isToggleOn: false,
      searchHidden:true,
      inputValue:'',
      redirect: false
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.returnSearch = this.returnSearch.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={'/search/' + this.state.inputValue} />
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('click', this.handleClick);
  }

  handleScroll(event) {
    var st = window.scrollY;


   if (this.props.headerStart) {
     if (st > windowHeight) {
       this.setState({
         fixHeader:true
       })
     } else if (st < windowHeight) {
       this.setState({
         fixHeader:false
       })
     }
   } else {
     this.setState({
       fixHeader:true
     })
   }

 }

  signOut() {
    this.props.logout()
  }

  toggleDrawer() {
    var self = this;

    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));

    var elem = document.getElementsByTagName("body")[0];
    if (elem.style.overflow=="hidden") {
      elem.style.overflow="auto"
    } else {
      elem.style.overflow="hidden"
    }
  }

  handleClick = (event) => {
    var element = document.getElementById("header-drawer")

    var isClickInside = element.contains(event.target);

    var clicked = event.target.id


    if (clicked != "open-toggle") {
      if (!isClickInside && this.state.isToggleOn) {
        this.toggleDrawer()
      }
    }

  }

  showSearch() {

    this.setState({
      searchHidden: false
    });

  }

  hideSearch() {

    this.setState({
      searchHidden: true,
      inputValue:''
    });

  }

  returnSearch(evt) {

    if(evt.keyCode == 13) {
      this.setState({
        redirect: true
      })
    }

  }

  updateInputValue(evt) {

    this.setState({
      inputValue: evt.target.value
    })

  }

  headerState() {
    if (this.props.user.email != null) {
      return <span onClick={this.signOut}>Sign Out</span>
    } else {
      return <Link to="/login">Login</Link>
    }

  }

  render() {
    var liClasses = classNames({
      'container': true,
      'invisible': this.state.scrolled,
      'fixed': this.state.fixHeader
    });

    var navClasses = classNames({
      'nav-container': true,
      'visible': this.state.isToggleOn
    });

    var searchClasses = classNames(
      'search-container',
      {'hidden': this.state.searchHidden}
    )

    return (
      <div className='fullHeader'>
        <header className={liClasses}>
          <div className='icon-container' onClick={this.toggleDrawer}><FontAwesome id="open-toggle"name='bars' size='2x' /><span className="menu-label">Menu</span></div>
          <div className='header-container'><h1>SPOFFORD</h1></div>
          <div className={searchClasses}>
            <FontAwesome onClick={this.showSearch} name='search' size='2x' />
            {this.renderRedirect()}
            <input placeholder="Search" value={this.state.inputValue} className="search-field" onKeyDown={this.returnSearch} tabIndex="0" onChange={evt => this.updateInputValue(evt)} />
            <span onClick={this.hideSearch} className='cancelTrigger'>Cancel</span>
          </div>
        </header>
        <div className={navClasses}>
          <div className='drawer' id="header-drawer">
            <div className='drawer-head'>
              <div className='icon-container' onClick={this.toggleDrawer}><FontAwesome name='times' size='2x' /></div>
              <div className='header-container'><h1 className="drawer-title">SPOFFORD</h1></div>
            </div>
            <nav>
              <ul>
                <li><Link to="/" onClick={this.toggleDrawer}>Home</Link></li>
                <li>Collections&mdash;Coming Soon</li>
                <li><Link to="/about" onClick={this.toggleDrawer}>About</Link></li>
                <li><Link to="/studios" onClick={this.toggleDrawer}>Studios</Link></li>
                <li>Society&mdash;Coming Soon</li>
                <li><Link to="/show" onClick={this.toggleDrawer}>2019 Group Show</Link></li>
                <hr />

                <li onClick={this.toggleDrawer}><a href="https://share.hsforms.com/10eEyKMOWQzi742fNhPUwZQ2emyf" target="_blank">Newsletter&mdash;Sign Up</a></li>
                <li onClick={this.toggleDrawer} className="login-toggle">{this.headerState()}</li>
                <hr />

                <a target="_blank" href="https://www.facebook.com/spofforddesign/"><i className="fab fa-facebook fa-3x"></i></a>
                <a target="_blank" href="https://www.instagram.com/spofforddesign/"><i className="fab fa-instagram fa-3x"></i></a>
                <a target="_blank" href="https://twitter.com/spofforddesign"><i className="fab fa-twitter fa-3x"></i></a>
                <a target="_blank" href="https://www.pinterest.com/spofforddesign"><i className="fab fa-pinterest fa-3x"></i></a>
                <hr />
                <li className="address">info&#64;spofforddesign.com</li>
              </ul>
            </nav>
          </div>
          <div className='overlay'></div>
        </div>
      </div>
    )
  }
};

const mapDispatchToProps = {
  logout: logout
};

const mapStateToProps = state => ({
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(cssModules(Header, style))
