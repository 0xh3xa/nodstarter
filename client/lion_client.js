  async function postData(url, data) {
      const response = await fetch(url, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'follow', // manual, *follow, error
          referrerPolicy: 'no-referrer', // no-referrer, *client
          body: JSON.stringify(data) // body data type must match "Content-Type" header
      });

      return await response.json(); // parses JSON response into native JavaScript objects
  }

  function addLion() {
      const lion_name = document.getElementsByName('lion_name')[0].value;
      const lion_pride = document.getElementsByName('lion_pride')[0].value;
      const lion_age = document.getElementsByName('lion_age')[0].value;
      const select = document.getElementById('lion_gender');
      const lion_gender = select.options[select.selectedIndex].text;

      const lion = {
          name: lion_name,
          pride: lion_pride,
          age: lion_age,
          gender: lion_gender
      };

      postData('/lions', lion)
          .then((data) => {
              const node = document.createElement("LI");
              const textnode = document.createTextNode(data.id + ' ' + data.name + ' ' + data.pride + ' ' + data.age + ' ' + data.gender);
              node.appendChild(textnode);
              document.getElementById("lions-list").appendChild(node);
          });
  }
