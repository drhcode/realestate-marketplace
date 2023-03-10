import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Loading from '../components/Loading'
import shareIcon from '../assets/svg/shareIcon.svg'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

const Listing = () => {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Loading />
  }
  return (
    <main>
      {/* Slider Images */}
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
            // style={{
            //   background: `url(${listing.imgUrls[index]}) center no-repeat`,
            //   backgroundSize: 'cover',
            // }}
            // className="swiperSlideDiv"
            >
              <img
                src={listing.imgUrls[index]}
                className="swiperSlideDiv"
                alt="images"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Share Icon */}
      <div
        className="shareIconDiv"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt="sahre" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied</p>}
      {/* Listing details */}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - ???
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === 'Rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className="discountPrice">
            ???{listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
          <p className="listingLocationTitle">Location</p>
          <div className="leafletContainer">
            {/* Map Container */}
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              center={[listing.geolocation.lat, listing.geolocation.lng]}
              scrollWheelZoom={false}
              zoom={14}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
              />
              <Marker
                position={[listing.geolocation.lat, listing.geolocation.lng]}
              >
                <Popup>{listing.location}</Popup>
              </Marker>
            </MapContainer>
          </div>
        </ul>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  )
}

export default Listing
