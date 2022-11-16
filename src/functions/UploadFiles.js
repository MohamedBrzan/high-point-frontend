import { t } from 'i18next';
import { toast } from 'react-toastify';

const UploadFiles = (fileId, inputValue) => {
  const file = document.getElementById(fileId).files[0];

  if (file.size > 15728640) {
    return toast.error(t('file_too_large'), {
      position: 'top-center',
    });
  }

  const reader = new FileReader();

  reader.addEventListener(
    'load',
    () => {
      inputValue(reader.result);
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
};

export default UploadFiles;
