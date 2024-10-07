import { SignIn } from "@clerk/clerk-react"
import Logo from '../../assets/images/logo.png'


export function Auth() {
  return (
    <div className="flex justify-between w-screen h-screen">
        <div className="hidden w-5/12 bg-muted md:flex md:flex-col md:justify-center md:items-center">
        <img src={Logo} alt="logo" className="h-11/12 w-11/12 xl:h-8/12 xl:w-8/12 max-w-[500px] object-cover dark:brightness-[0.2] dark:grayscale" />
        <h1 className="text-6xl text-center">Mestres Online</h1>
      </div>
      <div className="flex md:w-7/12 items-center justify-center py-12 bg-primary w-screen md:rounded-l-3xl">
        <SignIn forceRedirectUrl={"/myProfiles"} signUpForceRedirectUrl={"/myProfiles"}/>
      </div>
      
    </div>
  )
}
