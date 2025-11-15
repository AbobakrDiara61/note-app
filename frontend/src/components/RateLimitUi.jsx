import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPooStorm } from '@fortawesome/free-solid-svg-icons'

const RateLimitUi = () => {
  return (
    <div className='main-container bg-accent/5 border border-accent/20 rounded-md mt-5 p-5'>
      <div className='flex justify-start items-center gap-10'>
        <div className='shrink-0 size-14 rounded-full flex justify-center items-center bg-secondary/20 text-primary text-3xl'>
            <FontAwesomeIcon icon={faPooStorm} />
        </div>
        <div className='flex flex-col gap-1'>
            <h2 className='font-bold capitalize'>Rate limit reached</h2>
            <p className='text-stone-300 text-sm font-medium'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quasi </p>
            <p className='text-stone-300/70 text-xs font-normal'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eveniet quasi </p>
        </div>
      </div>
    </div>
  )
}

export default RateLimitUi
