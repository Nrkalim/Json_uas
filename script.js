let originalData; // Variable to store the original data

        // Fetch data from the REST API
        fetch('https://al-quran-8d642.firebaseio.com/data.json?print=pretty')
            .then(response => response.json())
            .then(data => {
                // Store the original data
                originalData = [data]; // Wrap the single data object in an array for consistency

                // Process the data and populate the table
                const tableBody = document.querySelector('#alquranTable tbody');

                data.forEach((dt, index) => {
                    const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${dt.nama}</td>
                        <td>${dt.asma}</td>
                        <td>${dt.arti}</td>
                        <td>${dt.ayat}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
            })
            .catch(error => console.error('Error fetching data:', error));

        // Function to filter pesantren based on search input
        function searchData() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toUpperCase();
            const table = document.getElementById('alquranTable');
            const rows = table.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const tdNo = rows[i].getElementsByTagName('td')[0]; // Index 0 corresponds to the ID column
                const tdName = rows[i].getElementsByTagName('td')[1]; 
                const tdAsma = rows[i].getElementsByTagName('td')[2];
                const tdArti = rows[i].getElementsByTagName('td')[3];
                const tdAyat = rows[i].getElementsByTagName('td')[4];
                if (tdNo || tdName || tdAsma || tdArti || tdAyat) {
                    const txtValueId = tdNo.textContent || tdNo.innerText;
                    const txtValueNama = tdName.textContent || tdName.innerText;
                    const txtValueAsma = tdAsma.textContent || tdAsma.innerText;
                    const txtValueArti = tdArti.textContent || tdArti.innerText;
                    const txtValueAyat = tdAyat.textContent || tdAyat.innerText;
                    if (txtValueId.toUpperCase().indexOf(filter) > -1 || txtValueNama.toUpperCase().indexOf(filter) > -1 || txtValueAsma.toUpperCase().indexOf(filter) > -1 || txtValueArti.toUpperCase().indexOf(filter) > -1 || txtValueAyat.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        }
