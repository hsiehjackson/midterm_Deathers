import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import MaterialIcon  from 'material-icons-react';

class Header extends Component {
  render() {

    return (
      <header>
        <ul className="todo-app__navbar">
          <li className="todo-app__navitem">
            <NavLink 
                to="/" 
                activeClassName="selected"
                exact>
            {<MaterialIcon icon="home"/>}
            </NavLink>
          </li>          
          <li className="todo-app__navitem">
            <NavLink 
                to="/weather" 
                activeClassName="selected"
                exact>
            {<MaterialIcon icon="wb_sunny"/>}
            </NavLink>
          </li>
          <li className="todo-app__navitem">
            <NavLink 
                to="/deadline" 
                activeClassName="selected"
                exact>
            {<MaterialIcon icon="list"/>}
            </NavLink>
          </li>
          <li className="todo-app__navitem">
            <NavLink 
                to="/calendar" 
                activeClassName="selected"
                exact>
            {<MaterialIcon icon="calendar_today"/>}
            </NavLink>
          </li>
        </ul>
        <h3 className="todo-app__title">Deathers</h3>
      </header>
    );
  }
}



export default Header;
