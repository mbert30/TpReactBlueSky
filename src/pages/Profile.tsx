import AuthGuard from "../app/authGuard"

const Profile = () => {
  return (
    <h1>Profile</h1>
  )
}

export default AuthGuard(Profile)