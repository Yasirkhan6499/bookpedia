import Link from 'next/link';
import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-5 sm:px-10 lg:px-20 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-8 mb-6">
        Welcome to BookLib, a Haven for Book Enthusiasts!
      </h1>

      <p className="text-sm sm:text-base mb-6">
        At Booklib, we believe that every book has a story and every collection has a soul. Our mission is to provide an exquisite online platform where bibliophiles can manage their personal libraries with ease and grace.
      </p>

      <h2 className="text-xl sm:text-2xl font-semibold my-5">Why Choose Us?</h2>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Curate Your Collection:</h3>
      <p className="mb-4">
        Dive into the world of literature and craft your very own collection. Whether you are a lover of classic literature, a fan of cutting-edge science fiction, or an avid explorer of non-fiction, our platform is designed to house your curated selections with a personal touch.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Manage with Simplicity:</h3>
      <p className="mb-4">
        With our intuitive interface, adding books to your collection is as effortless as the turn of a page. Our system allows you to catalog your books, adjust details, and organize your library exactly the way you want it.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Discover and Expand:</h3>
      <p className="mb-4">
        In our 'Add Items' section, discover a vast world of books to add to your library. Our search feature ensures that you find exactly what you're looking for, whether it's a title, an author, or a specific genre.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Share Your Passion:</h3>
      <p className="mb-4">
        Ready to showcase your collection to the world? Go public with your library and share the essence of your bookish taste. Publish your collections and share the link with friends, family, or fellow readers across the globe.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Inspired by the Best:</h3>
      <p className="mb-4">
        Our inspiration stems from a blend of classic library values and innovative ideas drawn from leading companies in the field. We've channeled this inspiration into creating a platform that celebrates the love of books and the joy of sharing knowledge.
      </p>

      <h3 className="text-lg sm:text-xl font-semibold mt-4 mb-2">Connect with Us:</h3>
      <p className="mb-4">
        Have suggestions, questions, or just want to talk about books? Reach out to us at{" "}
        <a 
          href="mailto:yasirkhan6499@gmail.com" 
          className="text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
        >
          yasirkhan6499@gmail.com
        </a>. We are always here to engage with our community of readers and book lovers.
      </p>

      <div className="text-center mt-8 mb-4">
        <Link href="/signup"
           className="inline-block bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            Join us at BookLib and transform the way you manage your book collections!
          
        </Link>
      </div>
    </div>
  );
};

export default About;
