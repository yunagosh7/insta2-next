import { getProviders, signIn as signIntoProvider } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";

const SignIn = ({ providers }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-56 px-14 text-center">
        <img src="https://links.papareact.com/ocw" className="w-80" alt="" />
        <p className="font-xs italic">Esta no es una aplicación real.</p>
        <div className="mt-40 ">
          {providers
            ? Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <button
                    className="p-3 bg-blue-500 rounded-lg text-white"
                    onClick={() =>
                      signIntoProvider(provider.id, { callbackUrl: "/" })
                    }
                  >
                    Sign in with {provider.name}
                  </button>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

export default SignIn;
