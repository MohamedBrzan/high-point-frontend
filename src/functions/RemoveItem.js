import { t } from 'i18next';
import { toast } from 'react-toastify';

export default async function RemoveItem(
  itemName,
  deleteApiName,
  itemId,
  refetch
) {
  try {
    // eslint-disable-next-line no-restricted-globals
    const checkIfTrue = confirm(t(`delete.delete_${itemName}_confirm`));

    if (checkIfTrue === true) {
      await deleteApiName(itemId).then((response) => {
        if (response.data) {
          toast.success(response.data.message, {
            position: 'top-center',
          });

          refetch();
        } else {
          toast.error(response.error.data.message, {
            position: 'top-center',
          });
        }
      });
    }
  } catch (error) {
    return toast.error(error.message, {
      position: 'top-center',
    });
  }
}
