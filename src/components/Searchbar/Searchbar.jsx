
import PropTypes from 'prop-types';
import { Header } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import { useState } from 'react';

export const Searchbar = ({onSubmit}) => {
const [searchField, setSearchField] = useState('');

  const handleChange = e => {
   const {value} = e.target
      setSearchField(value)
  };

 const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchField);
    setSearchField('');
  };

    return (
      <Header>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <span>
              Search
              <BsSearch size={13} style={{ marginLeft: '4px' }} />
            </span>
          </button>

          <input
            onChange={handleChange}
            value={searchField}
            name="searchField"
            type="text"
            autoComplete="off"
            autoFocus={true}
            placeholder="Search images and photos"
          />
        </form>
      </Header>
    );
  }


Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


