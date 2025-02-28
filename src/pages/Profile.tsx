import AuthGuard from "../app/AuthGuard"

const Profile = () => {
  return (
    <h1>Profile</h1>
  )
}

export default AuthGuard(Profile)