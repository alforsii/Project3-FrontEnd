import React, { Component } from 'react';
import './Home.css'

class home extends Component {

  generateRandomColor = () =>{
    // return '#'+Math.floor(Math.random()*16777215).toString(16);
    const colors = ['#ff7802', '#52017f', '#ea0003', '#00809e', '#20c579', '#e7e600', '#eb4f82', '#73cae3', '#027ebc', ]
    // const paddings = ['10x','20px', '25px', '15px', '13px', '7px', '30px', '25px', '5px', '3px', '35px']
    // const lightColors = ['#cdeef7', '#cad6f0', '#ffd5d6', '#feffd5', '#f3caf4', '#feffd5', '#96df6d', '#f09cd0', '#f7a4c0']
    // const len = document.querySelectorAll('.icons').length
    // const colorsArr = Array.from({length: len},(v, i) => colors[Math.floor(Math.random()*colors.length)])
    // const margins = ['0 5px', '0 7px', '0 3px', '0 5px', '0 5px']
    // document.querySelector('.icons-div').style.backgroundColor ='#cae6f2'
      document.querySelectorAll('.icons').forEach(eachIcon => {
        eachIcon.style.backgroundColor = colors[Math.floor(Math.random()*colors.length)];
        // eachIcon.style.padding =  paddings[Math.floor(Math.random()*paddings.length)]
        eachIcon.style.margin =  '1px'
      })
  }

  showHint = () => {
    document.querySelectorAll('.icons').forEach((icon, i) => {
      icon.addEventListener('mouseenter', event => {
        icon.children[1].classList.add('show-icon-hint')
      })
      icon.addEventListener('mouseleave', event => {
        icon.children[1].classList.remove('show-icon-hint')
      })
    })
  }
  
componentDidMount = () => {
  this.generateRandomColor()
  this.showHint()
}
render(){
  
    return (
      <div className='main-icons'>
        <div className='icons-div'>
          <div className='icons-bg'>
            <span className='icons chart-pie'>
              <i className='fas fa-chart-pie'></i>
              <i className='hide-hint'>grades</i>
            </span>
            <span className='icons telegram'>
              <i className='fab fa-telegram'></i>
              <i className='hide-hint'>telegram</i>
            </span>
            <span className='icons gratipay'>
              <i className='fab fa-gratipay'></i>
              <i className='hide-hint'>gratipay</i>
            </span>
            <span className='icons grav'>
              <i className='fab fa-grav'></i>
              <i className='hide-hint'>grav</i>
            </span>
            {/* <span className='icons star-half'>
              <i className="fas fa-star-half-alt"></i>
              <i className='hide-hint'>star</i>
            </span> */}
            <span className='icons star'>
              <i className="fas fa-star"></i>
              <i className='hide-hint'>star</i>
            </span>
            <span className='icons glasses'>
              <i className="fas fa-glasses"></i>
              <i className='hide-hint'>search</i>
            </span>
            <span className='icons globe-americas'>
              <i className="fas fa-globe-americas"></i>
              <i className='hide-hint'>social studies</i>
            </span>
            <span className='icons microscope'>
              <i className="fas fa-microscope"></i>
              <i className='hide-hint'>science</i>
            </span>
            <span className='icons graduation-cap'>
              <i className='fas fa-graduation-cap'></i>
              <i className='hide-hint'>graduation</i>
            </span>
            <span className='icons book-open'>
              <i className="fas fa-book-open"></i>
              <i className='hide-hint'>assignments</i>
            </span>
            <span className='icons settings'>
              <i className="fas fa-cog"></i>
              <i className='hide-hint'>settings</i>
            </span>
            <span className='icons atom'>
              <i className="fas fa-atom"></i>
              <i className='hide-hint'>atom</i>
            </span>
            <span className='icons flask'>
              <i className="fas fa-flask"></i>
              <i className='hide-hint'>flask</i>
            </span>
            <span className='icons rocket'>
              <i className="fas fa-rocket"></i>
              <i className='hide-hint'>rocket</i>
            </span>
            <span className='icons space-shuttle'>
              <i className="fas fa-space-shuttle"></i>
              <i className='hide-hint'>space</i>
            </span>
            <span className='icons podcast'>
              <i className="fas fa-podcast"></i>
              <i className='hide-hint'>podcast</i>
            </span>
            <span className='icons laptop'>
              <i className="fas fa-laptop"></i>
              <i className='hide-hint'>dashboard</i>
            </span>
            <span className='icons power-off'>
              <i className="fas fa-power-off"></i>
              <i className='hide-hint'>power of</i>
            </span>
            <span className='icons headphones'>
              <i className="fas fa-headphones"></i>
              <i className='hide-hint'>headphones</i>
            </span>
            <span className='icons bus'>
              <i className="fas fa-bus"></i>
              <i className='hide-hint'>bus</i>
            </span>
            <span className='icons comment'>
              <i className="fas fa-comment"></i>
              <i className='hide-hint'>chat</i>
            </span>
            <span className='icons sticky-note'>
              <i className="fas fa-sticky-note"></i>
              <i className='hide-hint'>sticky notes</i>
            </span>
            <span className='icons user-friends'>
              <i className="fas fa-user-friends"></i>
              <i className='hide-hint'>friends</i>
            </span>
            <span className='icons images'>
              <i className="fas fa-images"></i>
              <i className='hide-hint'>images</i>
            </span>
          </div>
        </div>
        <span className='icons info'>
          <i className="fas fa-info"></i>
          <i className='hide-hint'>info</i>
        </span>
      </div>
    )
  }
}

export default home;