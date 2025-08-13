// import React from "react";
// import Gallery from "../../components/Gallery/Gallery";

// const GalleryPage: React.FC = () => {
//   // Organized gallery data by events
//   const galleryEvents = [
//     {
//       eventTitle: "Fire Safety Training Program 2024",
//       eventDescription: "Comprehensive hands-on training sessions conducted for new recruits, focusing on modern firefighting techniques and safety protocols.",
//       images: [
//         {
//           src: "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Fire Safety Training Session",
//           description: "Students participating in hands-on fire safety training at NFSC campus"
//         },
//         {
//           src: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Emergency Response Drill",
//           description: "Practical emergency response training with modern firefighting equipment"
//         },
//         {
//           src: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Technical Workshop",
//           description: "Advanced technical workshop on modern firefighting techniques and equipment"
//         }
//       ]
//     },
//     {
//       eventTitle: "Campus Infrastructure & Facilities",
//       eventDescription: "State-of-the-art facilities and modern infrastructure that support world-class fire safety education and training programs.",
//       images: [
//         {
//           src: "https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Campus Infrastructure",
//           description: "Modern facilities and infrastructure at National Fire Service College"
//         },
//         {
//           src: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Research Laboratory",
//           description: "State-of-the-art research facilities for fire safety innovation and development"
//         },
//         {
//           src: "https://images.pexels.com/photos/1181896/pexels-photo-1181896.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Classroom Learning",
//           description: "Theoretical knowledge sessions covering fire science and safety protocols"
//         }
//       ]
//     },
//     {
//       eventTitle: "Annual Graduation Ceremony 2024",
//       eventDescription: "Celebrating the achievements of our graduating class and recognizing outstanding performance in fire safety education.",
//       images: [
//         {
//           src: "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Graduation Ceremony",
//           description: "Annual graduation ceremony celebrating our successful fire safety professionals"
//         },
//         {
//           src: "https://images.pexels.com/photos/1183099/pexels-photo-1183099.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Achievement Recognition",
//           description: "Recognizing outstanding performance and dedication of our students and faculty"
//         }
//       ]
//     },
//     {
//       eventTitle: "Community Outreach & Physical Training",
//       eventDescription: "Our commitment to community service and maintaining peak physical fitness standards for all fire service professionals.",
//       images: [
//         {
//           src: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Community Outreach Program",
//           description: "NFSC students conducting fire safety awareness in local communities"
//         },
//         {
//           src: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Physical Training",
//           description: "Rigorous physical fitness training essential for fire service professionals"
//         },
//         {
//           src: "https://images.pexels.com/photos/1181772/pexels-photo-1181772.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Equipment Maintenance",
//           description: "Students learning proper maintenance and care of firefighting equipment"
//         },
//         {
//           src: "https://images.pexels.com/photos/1183021/pexels-photo-1183021.jpeg?auto=compress&cs=tinysrgb&w=800",
//           title: "Team Building Exercise",
//           description: "Collaborative training exercises building teamwork and communication skills"
//         }
//       ]
//     },
//   ];

//   return (
//     <Gallery
//       title="NFSC Photo Gallery"
//       description="Explore our collection of memorable moments, events, and achievements at the National Fire Service College. Each image tells a story of dedication, training, and excellence in fire safety education."
//       galleryEvents={galleryEvents}
//     />
//   );
// };

// export default GalleryPage;





import React from "react";
import Gallery from "../../components/Gallery/Gallery";

const GalleryPage: React.FC = () => {

  return (
    <Gallery
      title="NFSC Photo Gallery"
      description="Explore our collection of memorable moments, events, and achievements at the National Fire Service College. Each image tells a story of dedication, training, and excellence in fire safety education."
    />
  );
};

export default GalleryPage;