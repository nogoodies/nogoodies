import React from 'react';
import { NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumpsterFire } from '@fortawesome/free-solid-svg-icons';

export function Brand() {
  return (
    <NavbarBrand tag={Link} to="/" className="brand-logo">
      <FontAwesomeIcon className="brand-icon" icon={faDumpsterFire} size="lg" />
      <span className="brand-title">No Goodies</span>
    </NavbarBrand>
  );
}
