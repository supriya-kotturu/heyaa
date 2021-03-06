import React, { useEffect } from 'react';
// import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { getContactsFromSupabase } from '../redux';
import Card from './UI/Card';

const ContactsList = (props) => {
  const contactList = useSelector((state) => state.contacts.contactList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContactsFromSupabase);
  }, [dispatch]);

  // console.log('list: ', contactList);
  //  grid grid-flow-row place-items-center grid-gap-2 md:grid-cols-2 lg:grid-cols-4
  return (
    <div className="mx-auto p-2 w-4/5 flex flex-row flex-wrap justify-center">
      {contactList.map(
        ({
          id,
          firstName,
          lastName,
          landline,
          workPhone,
          workEmail,
          email,
        }) => (
          <Card
            key={id}
            id={id}
            name={firstName + ' ' + lastName}
            workPhone={workPhone}
            landline={landline}
            workEmail={workEmail}
            email={email}
          />
        )
      )}
    </div>
  );
};

// ContactsList.propTypes = {};

export default React.memo(ContactsList);
