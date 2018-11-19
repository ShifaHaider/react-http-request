import React, {Component} from 'react';
import firebase from 'firebase'


class ViewItem extends Component {

    constructor(props) {
        super(props);
        this.state={
        category : 'Mobiles'
        }
    }
    loadCategory() {
        var arr = [];
        var db = firebase.firestore();
        var settings = {timestampsInSnapshots: true};
        db.settings(settings);
        var category = this.state.category;
        db.collection('post').where('category', '==', category).onSnapshot((items) => {
            items.docChanges().forEach((item) => {
                var items = item.doc.data();
                items.orderID = item.doc.id;
                arr.push(items);
                this.setState({userOrders: arr})
            })
        })
    }


    render() {
        return (
            <div>

            </div>
        )
    }

}

export default ViewItem;


