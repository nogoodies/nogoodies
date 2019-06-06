import React from 'react';
import { Navbar, Nav, NavbarToggler, Collapse } from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';
import { Brand } from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu } from '../menus';
import './header.scss';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

export interface IHeaderState {
  menuOpen: boolean;
}

export default class Header extends React.Component<IHeaderProps, IHeaderState> {
  state: IHeaderState = {
    menuOpen: false
  };

  toggleMenu() {
    this.setState(({ menuOpen }) => ({ menuOpen: !menuOpen }));
  }

  render() {
    const { isAuthenticated, isAdmin, isSwaggerEnabled, isInProduction } = this.props;

    return (
      <div id="app-header">
        {isAdmin ? (
          <>
            <LoadingBar className="loading-bar" />
            <Navbar dark expand="sm" fixed="top" className="bg-primary">
              <NavbarToggler aria-label="Menu" onClick={this.toggleMenu} />
              <Brand />
              <Collapse isOpen={this.state.menuOpen} navbar>
                <Nav id="header-tabs" className="ml-auto" navbar>
                  <EntitiesMenu />
                  <AdminMenu showSwagger={isSwaggerEnabled} showDatabase={!isInProduction} />
                  <AccountMenu isAuthenticated={isAuthenticated} />
                </Nav>
              </Collapse>
            </Navbar>
          </>
        ) : (
          <Navbar dark expand="sm" fixed="top" className="bg-primary">
            <Brand />
          </Navbar>
        )}
      </div>
    );
  }
}
