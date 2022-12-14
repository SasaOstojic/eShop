import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.scss'
import Card from '../../components/card/Card'
import {FaPhoneAlt, FaEnvelope, FaTwitter} from 'react-icons/fa'
import {GoLocation} from 'react-icons/go'
import {toast} from 'react-toastify'

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_rbx3fnq', 'template_d5f2emf', form.current, '-IPmsDdAjTWvpWBB3')
      .then((result) => {
          toast.success('Message sent successfuly.')
      }, (error) => {
          toast.error(error.text)
      });
      e.target.reset();
  };


  return (
    <section>
      <div className={`container ${styles.contact}`}>
        <h2>Contact</h2>
      <div className={styles.section}>
        <form ref={form} onSubmit={sendEmail}>
            <Card cardClass={styles.card}>
              <label>Name</label>
              <input type="text" name="user_name" placeholder="Full Name" required/>
              <label>Email</label>
              <input type="email" name="user_email" placeholder="Your email" required/>
              <label>Subject</label>
              <input type="text" name="subject" placeholder="Subject" required/>
              <label>Message</label>
              <textarea name="message" cols='30' rows="10"></textarea>
              <button className="--btn --btn-primary">Send message</button>
            </Card>
        </form>
        <div className={styles.details}>
          <Card cardClass={styles.card2}>
            <h3>Our contact information</h3>
            <p>Fill the form or contact us via other channels listed below</p>
            <div className={styles.icons}>
              <span>
                <FaPhoneAlt/>
                <p>+38164 9917 674</p>
              </span>
              <span>
                <FaEnvelope/>
                <p>support@eshop.com</p>
              </span>
              <span>
                <GoLocation/>
                <p>Belgrade Serbia</p>
              </span>
              <span>
                <FaTwitter/>
                <p>@oxon88</p>
              </span>
            </div>
          </Card>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Contact