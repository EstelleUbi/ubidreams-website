import { Image } from 'react-datocms'
import ReactHtmlParser from 'react-html-parser'

export const CardExpert = ({ config = {} }) => {
  return config.map((expert, index) => {
    return (
      <div key={index} className='mb-6'>
        <div className='card shadow-light-lg mb-7 mb-md-0 custom-card-link h-100'>
          <div className='card-zoom h-100 object-cover'>
            <Image
              alt=''
              data={{
                ...expert.cardCover.responsiveImage
              }}
              className='card-img-top'
            />
          </div>
          {expert.presentation && (
            <div className='card-img-overlay pt-0 card-img-overlay-hover'>
              <div className='card-body h-100 mb-2 text-muted bg-white'>{ReactHtmlParser(expert.presentation)}</div>
            </div>
          )}
          <div className='card-body bg-white'>
            <div className='shape shape-bottom-100 shape-fluid-x text-white'>
              <svg viewBox='0 0 2880 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z' fill='currentColor' />
              </svg>
            </div>

            <h6 className='text-uppercase mb-1 text-muted'>{expert.subtitle}</h6>

            <h4 className='mb-0'>{expert.title}</h4>
          </div>
        </div>
      </div>
    )
  })
}

export default CardExpert
