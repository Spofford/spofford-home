import React from "react";
import FontAwesome from "react-fontawesome";
import cssModules from 'react-css-modules';
import classNames from 'classnames';
import style from "./style.css";
import { Link } from 'react-router-dom'

export class Header extends React.Component {

  constructor() {
    super()

    this.state = {
      scrolled: false,
      lastScrollTop: 0,
      isToggleOn: false
    }

    this.handleScroll = this.handleScroll.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }



  componentDidMount(lastScrollTop) {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    var st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > this.state.lastScrollTop){
      this.setState({'scrolled': true});
    } else {
      this.setState({'scrolled': false});
    }
    if (st <= 0) {
      this.setState({'lastScrollTop': 0})
    } else {
      this.setState({'lastScrollTop': st})
    }
  }

  toggleDrawer() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {

    var liClasses = classNames({
      'container': true,
      'invisible': this.state.scrolled
    });

    var navClasses = classNames({
      'nav-container': true,
      'visible': this.state.isToggleOn
    });

    return (
      <div className='fullHeader'>
        <header className={liClasses}>
          <div className='icon-container' onClick={this.toggleDrawer}><FontAwesome name='bars' size='2x' /></div>
          <div className='header-container'><h2>SPOFFORD</h2></div>
          <div className='icon-container'><FontAwesome name='search' size='2x' /></div>
        </header>
        <div className={navClasses}>
          <div className='drawer'>
            <div className='drawer-head'>
              <div className='icon-container' onClick={this.toggleDrawer}><FontAwesome name='times' size='2x' /></div>
              <div className='header-container'><h2><Link to="/" onClick={this.toggleDrawer}>SPOFFORD</Link></h2></div>
            </div>
            <nav>
              <ul>
                <li>Collections&mdash;Coming Soon</li>
                <li><Link to="/about" onClick={this.toggleDrawer}>About</Link></li>
                <li><Link to="/studios" onClick={this.toggleDrawer}>Studios</Link></li>
                <li>Society&mdash;Coming Soon</li>
                <hr />
                <li onClick={this.toggleDrawer}><a href="https://share.hsforms.com/133H57bK5QhW0Mr9r57XnOA2emyf" target="_blank">Newsletter&mdash;Sign Up</a></li>
                <hr />
                <i className="fab fa-facebook fa-3x"></i>
                <i className="fab fa-instagram fa-3x"></i>
                <i className="fab fa-twitter fa-3x"></i>
                <i className="fab fa-pinterest fa-3x"></i>
                <hr />
                <li>info&#64;spofforddesign.com</li>
              </ul>
            </nav>
          </div>
          <div className='overlay'></div>
        </div>
      </div>
    )
  }
};

export default cssModules(Header, style);
