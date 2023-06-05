import SoldOutItemBox from '../../../Components/ItemBox/SoldOutItemBox'

function SoldOutList({ soldOutList }) {
	const {
		products: { product },
	} = soldOutList

	return (
		<>
			{product?.map((item, idx) => {
				return (
					<SoldOutItemBox
						title={item.title}
						price={item.price}
						posterPath={item.img_url}
						isLiked={item.liked}
						createdAt={item.createdAt}
						key={idx}
						status={item.status}
						// onClick={() => navigate(`/detail/${item.idx}`)}
					/>
				)
			})}
		</>
	)
}
export default SoldOutList
