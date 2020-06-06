import {
 call, put, all, takeLatest, select
} from 'redux-saga/effects';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCardSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
  const productExist = yield select((state) =>
    state.cart.find((p) => p.id === id),
  );

  if (productExist) {
    const amount = productExist.amount + 1;

    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    yield put(addToCardSuccess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
