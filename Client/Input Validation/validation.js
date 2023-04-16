function validateFile() {
  var fileInput = document.getElementById('file');
  var filePath = fileInput.value;
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.mp4)$/i;
  
  if (!allowedExtensions.exec(filePath)) {
    alert('Please upload file having extensions .jpeg/.jpg/.png/.gif/.mp4 only.');
    fileInput.value = '';
    return false;
  } else if (fileInput.files[0].size > 50000000) { // 50 MB is maximum file size  ---> maybe more later
    alert('File size should not exceed 50 MB.');
    fileInput.value = '';
    return false;
  } else {
    return true;
  }
}
