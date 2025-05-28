import { JSX } from "react";
import { useSeo } from "../utils/seo";

interface ProfileProps {
  setIsLoggedIn: (value: boolean) => void;
}
const Profile = ({ setIsLoggedIn }: ProfileProps): JSX.Element => {
  useSeo({
    title: "Profile",
    description: "Halaman profile pengguna",
    keywords: "profile, user",
  });
  return (
    <>
      <div className='profile'>
        <div></div>
      </div>
    </>
  );
};

export default Profile;
