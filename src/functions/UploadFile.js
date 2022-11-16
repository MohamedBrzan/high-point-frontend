import { t } from 'i18next';
import { toast } from 'react-toastify';

const UploadFile = (fileId, previewId, inputValue) => {
  const file = document.getElementById(fileId).files[0];

  let preview;

  if (previewId) {
    preview = document.getElementById('productImagePreview');
  }

  if (file.size > 15728640) {
    return toast.error(t('file_too_large'), {
      position: 'top-center',
    });
  }

  const reader = new FileReader();

  reader.addEventListener(
    'load',
    () => {
      if (preview) {
        preview.src = reader.result;
      }
      inputValue(reader.result);
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
};

export default UploadFile;
