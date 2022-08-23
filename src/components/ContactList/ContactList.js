import ContactItem from "components/ContactItem/ContactItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts} from "../../store/reducer";
import s from "./ContactList.module.css";

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contactsSlice.contacts.items);
    const filterValue = useSelector((state) => state.contactsSlice.contacts.filter.value);
    const isLoading = useSelector((state) => state.contactsSlice.isLoading);
    const error = useSelector((state) => state.contactsSlice.error);
    
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);


    const getVisibleContacts = () => {
        const filterValueTolowerCase = filterValue.toLowerCase();

        console.log(contacts)
        return contacts.filter(
            contact => contact.name.toLowerCase().includes(filterValueTolowerCase)
        );
    };

    let filtredContacts = getVisibleContacts();
    
    return (
        <ul className={s.list}>
            {error && <p>{error}</p>}
            {isLoading && <p>Loading...</p>}
                
            {filtredContacts.map((item) => (
                <ContactItem key={item.id} item={item} />
            ))}
        </ul>
    );
};

export default ContactList;