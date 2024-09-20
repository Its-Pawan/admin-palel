import React, { useEffect } from "react";
import Card from "components/card"; 

const Banner = ({ profile }) => { 
  // console.log(profile);
  // {_id: '66d590addeaa7a1e969b4a4e', name: 'Pawan Joshi', about: 'Hello, I am Pawan', profileImage: 'http://res.cloudinary.com/pawanportfolio/image/upload/v1725272229/p6epyj0neyzsj7la4kyy.jpg', coverImage: 'http://res.cloudinary.com/pawanportfolio/image/upload/v1725274539/gan5s0mznxzn8eqfwdmm.jpg', …}
  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      {/* Background and profile */}
      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(${profile.coverImage})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          <img
            className="h-full w-full rounded-full"
            src={profile.profileImage}
            alt="profile.name"
          />
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {profile.name}
        </h4>
        <p className="text-base font-normal text-gray-600">{profile.email}</p>
      </div>
 
    </Card>
  );
};

export default Banner;
