import React from 'react'

const AccountSetupLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div className='min-h-screen w-full flex items-center justify-start flex-col p-6 bg-background'>
      <div className='w-full max-w-md h-full flex flex-col grow'>
        <h1 className='font-bold w-full text-lg'>Configuration</h1>
        <h2 className='text-muted-foreground w-full text-sm leading-4 mt-2'>Personnalisez vos choix pour une experience idéale.</h2>
        {/* <span className='text-muted-foreground w-full text-[0.8rem]'>Vous pouvez les personnaliser davantage après l'étape de configuration</span> */}

        <div className='h-px w-full bg-card-border mt-10'></div>

        <div className='grow flex flex-col'>
            {children}
        </div>
      </div>
    </div>
  )
}

export default AccountSetupLayout