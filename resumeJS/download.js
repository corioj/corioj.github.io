function download(url) {
  const a = document.createElement('a')
  a.href = url
  a.download = url
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const downloadZone = document.getElementsByClassName("download-resume");
downloadZone[0].addEventListener("click", function() {
	download("resumeJS/CorioJ_DS_Resume_SP23.pdf")
});