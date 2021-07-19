import Image from 'next/image'

/**
 * Card référence et collaborateur
 * @param config (données sous la forme d'un tableau d'objet)
 */
const CardReference = ({ config = [] }) => {
  return config.map((item, index) => {
    return (
      <a key={index} className='card shadow-light-lg mb-7 mb-md-0 m-md-2 custom-card-link' href='#!'>
        <div className='card-zoom'>
          <Image src={item.img} alt={item.subtitle} className='card-img-top' />
        </div>

        <div className='card-body'>
          <div className='shape shape-bottom-100 shape-fluid-x text-white'>
            <svg viewBox='0 0 2880 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z' fill='currentColor' />
            </svg>
          </div>

          <h6 className='text-uppercase mb-1 text-muted'>{item.subtitle}</h6>

          <h4 className='mb-0'>{item.title}</h4>
        </div>
      </a>
    )
  })
}

export default CardReference