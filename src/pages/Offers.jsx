import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    collection,
    getDocs,
    query,
    where,
    orderBy,
    limit,
    startAfter,
} from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'
import ListingItem from '../components/listingItem'

const Offers = () => {
    const [listings, setListings] = useState(null)
    const [loading, setLoading] = useState(true)

    const params = useParams()

    useEffect(() => {
        const fetchListing = async () => {
            try {
                //get Ref
                const listingsRef = collection(db, 'listings')

                //create query
                const q = query(
                    listingsRef,
                    where('offer', '==', true),
                    orderBy('timestamp', 'desc'),
                    limit(10)
                )
                //execute query
                const querySnap = await getDocs(q)
                const listings = []

                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data(),
                    })
                })
                setListings(listings)
                setLoading(false)
            } catch (error) {
                toast.error('Cannot get listing due to an error on server')
            }
        }
        fetchListing()
    }, [])

    return (
        <div className="category">
            <header>
                <p className="pageHeader">Offers</p>
            </header>
            {loading ? (
                <Loading />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem
                                    key={listing.id}
                                    id={listing.id}
                                    listing={listing.data}
                                />
                            ))}
                        </ul>
                    </main>
                </>
            ) : (
                <p>There are not offers for the moment</p>
            )}
        </div>
    )
}

export default Offers
