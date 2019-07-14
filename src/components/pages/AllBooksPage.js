import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon,Card } from 'semantic-ui-react';
// import { Link } from 'react-router-dom';
import { loadBooksData } from '../../actions/books';
import BookPage from '../pages/BookPage';

class AllBooksPage extends React.Component {
    
    state = {
        loading: true,
        success: false,
        pageNumber :1,
        filesPerPage : 10,
        allBooks:[]
    }
    componentDidMount() {
        this.props.loadBooksData(this.state.pageNumber, this.state.filesPerPage)
            .then((books) => this.setState({ allBooks:books, loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }
    
    render() {
        const { loading, success, allBooks } = this.state;
        return (
            <div>
                <h2>Books Store:</h2>
                 {loading && (
                    <Message icon>
                        <Icon name="circle notched" loading />
                        <Message.Header>Loading books library...</Message.Header>
                    </Message>
                )}
                {!loading && success && 
                    (<div>
                        <div className="container">
                            <Card.Group>
                                {allBooks.map((value) => <BookPage key={value._id} book={value} userBook={false}/> )}
                            </Card.Group>
                        </div>
                    </div>)
                }

                {!loading && !success && (
                    <Message negative icon>
                        <Icon name="warning sign" />
                        <Message.Content>
                            <Message.Header>Oops!! Unbale to load books library</Message.Header>
                            Please refresh the page or check back in sometime.
                        </Message.Content>
                    </Message>
                )}
            </div>
               
        );
    }
}
AllBooksPage.propTypes = {
    loadBooksData:PropTypes.func.isRequired
}
export default connect(null, {loadBooksData})(AllBooksPage);