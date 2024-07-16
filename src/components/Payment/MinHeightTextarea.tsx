import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { orderSetNotice } from '../../features/order/orderSlice';
export default function MinHeightTextarea() {
  const dispatch = useDispatch();
  return (
    <Textarea aria-label="minimum height" onChange={(event) => {
      dispatch(orderSetNotice(event?.target.value))
    }} maxRows={10} minRows={5} placeholder="Ghi chú (Nếu có)" />
  );
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
    box-sizing: border-box;
    width: 343px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    margin : 15px 0 0 0;
    border-radius: 8px;
  `,
);
