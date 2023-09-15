document.querySelectorAll('.btn-print').forEach(element => {
    element.addEventListener('click', (event) => {
        const id_ticket = event.currentTarget.dataset.ticket
        fetch(`/ticket-print`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `id_ticket=${id_ticket}`,
        })
        .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.blob(); // Convert the response to a Blob
          })
          .then(blob => {
            const blobUrl = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = 'downloaded_ticket.pdf'; // Specify the desired filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(blobUrl);
          })
          .catch(error => {
            console.error('Error:', error);
          });
    })
})