import * as ProductApi from './Product/product.api'
import * as UserApi from './User/user.api'

export const handler = [...Object.values(ProductApi), ...Object.values(UserApi)]
