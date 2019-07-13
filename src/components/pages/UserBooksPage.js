import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Icon,Card } from 'semantic-ui-react';
import { loadUserBooksData } from '../../actions/books';
import BookPage from '../pages/BookPage';

class UserBooksPage extends React.Component {
    
    state = {
        loading: true,
        success: false,
        pageNumber :1,
        filesPerPage : 10,
        userBooks:[]
    }
    componentDidMount() {
        this.props.loadUserBooksData(this.state.pageNumber, this.state.filesPerPage,
            this.props.user.username)
            .then((books) => this.setState({ userBooks:books, loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }
    
    render() {
        const { loading, success, userBooks } = this.state;
        return (
            <div>
                <h2>Your Books:</h2>
                 {loading && (
                    <Message icon>
                        <Icon name="circle notched" loading />
                        <Message.Header>Loading Your Books...</Message.Header>
                    </Message>
                )}
                {!loading && success && 
                    (<div>
                        <div className="container"> 
                            <Card.Group>
                                {userBooks.map((value) => 
                                <BookPage key={`user_${value._id}`} book={value} userBook={true}/> )}
                            </Card.Group>
                        </div>
                    </div>)
                }

                {!loading && !success && (
                    <Message negative icon>
                        <Icon name="warning sign" />
                        <Message.Content>
                            <Message.Header>Oops!! Unbale to load your books</Message.Header>
                        </Message.Content>
                    </Message>
                )}
            </div>
               
        );
    }
}

UserBooksPage.propTypes = {
    loadUserBooksData:PropTypes.func.isRequired,
    user:PropTypes.shape({
    username:PropTypes.string.isRequired
    }).isRequired
}
const mapStateToProps = (state)=>{
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {loadUserBooksData})(UserBooksPage);