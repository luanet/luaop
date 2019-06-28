import { Link } from 'react-router-dom';
import React from 'react';
import { InputV2 } from '../toolbox/inputsV2';
import { PrimaryButtonV2, SecondaryButtonV2 } from '../toolbox/buttons/button';
import { tokenMap } from '../../constants/tokens';
import AccountVisual from '../accountVisual';
import Box from '../boxV2';
import EmptyState from '../emptyStateV2';
import regex from '../../utils/regex';
import routes from '../../constants/routes';
import styles from './bookmarksList.css';
import svg from '../../utils/svgIcons';

class BookmarksList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.deleteBookmark = this.deleteBookmark.bind(this);
    this.editBookmark = this.editBookmark.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }
  getBookmarkListBasedOnSelectedToken() {
    const { bookmarks, token, limit } = this.props;
    const { filter } = this.state;

    return bookmarks[token.active].filter(({ title, address }) => (
      filter === '' ||
      title.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
      address.toLowerCase().indexOf(filter.toLowerCase()) !== -1
    )).slice(0, limit);
  }

  displayAddressBasedOnSelectedToken(address) {
    const { token } = this.props;

    return token.active === tokenMap.LSK.key
      ? address
      : address.replace(regex.btcAddressTrunk, '$1...$3');
  }

  onFilterChange({ target }) {
    this.setState({
      filter: target.value,
    });
  }

  editBookmark(e, { address, title }) {
    this.setState({
      eddittedAddress: address,
      eddittedTitle: title,
    });
    e.preventDefault();
  }

  deleteBookmark(e, { address }) {
    const { token, bookmarkRemoved } = this.props;
    bookmarkRemoved({ address, token: token.active });
    e.preventDefault();
  }

  saveChanges(e) {
    const { token, bookmarkUpdated } = this.props;
    const { eddittedAddress, eddittedTitle } = this.state;
    bookmarkUpdated({
      account: {
        address: eddittedAddress,
        title: eddittedTitle,
      },
      token: token.active,
    });
    this.editBookmark(e, {});
  }

  onTitleChange({ target }) {
    this.setState({
      eddittedTitle: target.value,
    });
  }

  onRowClick(e) {
    const { eddittedAddress } = this.state;
    if (eddittedAddress) {
      e.preventDefault();
    }
  }

  render() {
    const {
      t, token, className, enableFilter, title, isEditable,
    } = this.props;
    const {
      filter, eddittedAddress, eddittedTitle,
    } = this.state;

    const selectedBookmarks = this.getBookmarkListBasedOnSelectedToken();

    return (
      <Box className={` ${styles.box} ${className} bookmarks-list`}>
        <header>
          <h2>{title || t('Bookmarks')}</h2>
          { enableFilter
            ? <span>
                <InputV2
                  className='bookmarks-filter-input'
                  size='xs'
                  onChange={this.onFilterChange}
                  value={filter}
                  placeholder={t('Filter by name...')}
                />
              </span>
            : null
          }
        </header>
        <div className={`${styles.bookmarkList} bookmark-list-container`}>
        {
          selectedBookmarks.length
          ? selectedBookmarks.map(bookmark =>
            <Link
              onClick={this.onRowClick}
              key={bookmark.address}
              className={`${styles.row} bookmark-list-row`}
              to={`${routes.accounts.path}/${bookmark.address}`}>
              <div className={styles.avatarAndDescriptionWrapper}>
                {
                  token.active === tokenMap.LSK.key
                  ? <AccountVisual className={styles.avatar} address={bookmark.address} size={40}/>
                  : null
                }
                { eddittedAddress === bookmark.address
                  ? <InputV2
                      className={`bookmarks-edit-input ${styles.editInput}` }
                      size='m'
                      onChange={this.onTitleChange}
                      value={eddittedTitle}
                      placeholder={t('Filter by name...')}
                    />
                  : <span className={styles.description}>
                      <span>{bookmark.title}</span>
                      <span>{this.displayAddressBasedOnSelectedToken(bookmark.address)}</span>
                    </span>
                }
              </div>
              { isEditable
                ? <div className={styles.buttonContainer}>
                  { eddittedAddress === bookmark.address
                    ? <React.Fragment>
                        <SecondaryButtonV2
                         onClick={e => this.editBookmark(e, {})}
                         className="medium bookmarks-cancel-button">
                         {t('Cancel')}
                       </SecondaryButtonV2>
                       <PrimaryButtonV2
                         onClick={e => this.saveChanges(e)}
                         className="medium bookmarks-save-changes-button">
                         {t('Save changes')}
                       </PrimaryButtonV2>
                     </React.Fragment>
                   : <React.Fragment>
                       <SecondaryButtonV2
                         onClick={e => this.editBookmark(e, bookmark)}
                         className="medium bookmarks-edit-button">
                         {t('Edit')}
                       </SecondaryButtonV2>
                       <PrimaryButtonV2
                         onClick={e => this.deleteBookmark(e, bookmark)}
                         className={`medium bookmarks-delete-button ${styles.deleteButton}`}>
                         {t('Delete')}
                       </PrimaryButtonV2>
                     </React.Fragment>
                  }
                  </div>
                : null
              }
            </Link>)
          : <EmptyState>
              <img src={svg.bookmarksIconEmptyState} />
              <h1>{t('No Bookmarks added yet')}</h1>
              <p>{t('Start adding some addresses to bookmarks, to keep track of them.')}</p>
              <div>
                { /* TODO - pass the correct link when bookmarks page is avaiable
                  <Link to={'#'}>
                    <SecondaryButtonV2>{t('Search Accounts')}</SecondaryButtonV2>
                  </Link>
                */ }
              </div>
          </EmptyState>
        }
        {
          /* TODO - pass the correct link when bookmarks page is avaiable  and enable this button
          selectedBookmarks.length
          ? <div className={styles.footer}>
              <Link to={'#'}>
                <SecondaryButtonV2>{t('View All')}</SecondaryButtonV2>
              </Link>
            </div>
          : null */
        }
        </div>
      </Box>
    );
  }
}

export default BookmarksList;
