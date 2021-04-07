/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { UIEvent, PhotoEditorSDKUI, LibraryConfiguration, LibraryLocale,LibraryProvider, LibraryCategory, LibraryImage } from 'photoeditorsdk'
// core components
import SimpleHeader from "components/Headers/SimpleHeader.js";

export class PhotoEditorSDK extends React.Component {
  componentDidMount() {
    this.initEditor()
  }
  async initEditor() {
    const editor = await PhotoEditorSDKUI.init({
      container: '#editor',
      layout: 'advanced',
      theme: 'light',
      library: {
        enableWebcam: true, // Disables the webcam
        enableUpload: true, // Disables the upload
      },
      controlsOptions: {
        text: {
          fonts: [
            {
              fontFamily: 'VIC Font', // The font family name, defined by you. Can be anything.
              variations: [
                {
                  identifier: 'VIC-Bold', // A unique identifier for this font
                  provider: 'file',
                  filePath: 'public\assets\font\fonts\VIC-Bold.woff',
                  textMetrics: {
                    unitsPerEm: 2048,
                    ascender: 500,
                    descender: -400
                  }
                },
              ]
            }
          ]
        }
      },
    
      enableUpload: 'true',
      showCloseButton: 'false',
      image: '../../../../example.jpg', // Image url or Image path relative to assets folder
      license: '{"api_token":"aD2qInSfuAN-SqKZYu-z6g","app_identifiers":["localhost","caucus.digital","www.caucus.digital"],"available_actions":[],"domains":["https://api.photoeditorsdk.com"],"enterprise_license":false,"expires_at":null,"features":["camera","library","export","customassets","whitelabel","adjustment","sticker","text","textdesign","transform"],"issued_at":1617683144,"minimum_sdk_version":"1.0","owner":"Maddie Bradford","platform":"HTML5","products":["pesdk"],"version":"2.4","signature":"UrG8hCvqnf2JdLknGA0glpDxv0LDdI7GhktUluasiUDf4zdzQmEhFMkijihCYmXcPcnFx3lCmLP7O8t5AQMUGNWyr4sVh5kx5UpC/RW1zrUQ7tOIQFivbVfCla/k8rz/e0MMDo9EcPsYVta2VCibV/Bp8ijiiBNU0Ey75OONewXdEfeyfWbNYfMcWnnSp6516gF3q7QeU9JActAq8HKZTYQFWL+mCzS/1dsoqrDYbr4pGFmwvkTJZDum7fw6OnGUthsV+g+q8q3rvj8Q3iyD2dd3vaBev/3Iupql9EAB3F2cZ7bzgBVftBEV3H2P5VwMtO61b+NnJdS2GdhdVNpHKwh6uQzNF7KhWqwczo8hTbzMsnyRo/OdJB/XpPNb/gdhaq+/ZDqVrBbbqbY5EWeWEIdStvLEiyUWM9oT5U19AwirjNkOxu1/WZEuhpheopYLc+AVddHLnTGFL0UjQUMb9LKPEL6vxlZuKAO1/SdbCplL+2iXnNJ/Iqmwk0KFx4qK3KPCWk05co5WoQJgsOZVMXzDqSg/6xH/ajiPPQdtlBFXUfEcPQIjOZ75hhEd1KF9EjHNaqUrFiC+R1bbWeOUrjl6LPavac/SQ7b+GUhherIMVQKudXtsbDUURFRPzlpyxrtuYtoHO8uGB7lEuPUZOguyspkUqVZXyycXqLkfbsQ="}',   
       assetBaseUrl: '../../../assets/',
     
      
    })
    editor.on(UIEvent.EXPORT, (imageSrc) => {
      
    })
  }

  render() {
    return (
      <div>
<div id="editor" style={{ width: '100vw', height: '100vh' }} />

      </div>
      
      
    )
  }
}

class MyProvider extends LibraryProvider {
  /**
   * This is a method explicitly created for this provider. It makes sure our data
   * JSON has been loaded from the server.
   * @return {Promise}
   * @private
   */
  loadData() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return this.loadJSON(
      "https://img.ly/static/libraries/unsplash/metadata.json"
    ).then((data) => {
      this.data = data;
      return data;
    });
  }

  /**
   * Returns the categories
   * @return {Promise}
   * @resolve {LibraryCategory[]}
   * @abstract
   */
  getCategories() {
    return this.loadData().then((data) => {
      // Create `Category` instances from our data
      return data.categories.map((categoryData) => {
        return new LibraryCategory({
          name: categoryData.name,
          coverImageUrl: categoryData.coverImage,
        });
      });
    });
  }

  /**
   * Returns the images for the given search query
   * @param {String} query
   * @return {Promise}
   * @resolve {LibraryImage[]}
   * @abstract
   */
  searchImages(query) {
    return this._loadData().then((data) => {
      return data.images
        .filter((image) => {
          // Split query by spaces, make sure all words are present in image title
          var words = query.split(/\s+/);
          for (var i = 0; i < words.length; i++) {
            var word = words[i];
            var regexp = new RegExp(word, "i");
            if (!regexp.test(image.title)) {
              return false;
            }
          }

          return true;
        })
        .map((imageData) => {
          return new Image(imageData);
        });
    });
  }
}

function Pricing() {
  return (
    <>
      <SimpleHeader name="Editor" parentName="Components" />
      <Container className="mt--6" fluid>
        <Row className="justify-content-center">
          <Col className="card-wrapper">
            <PhotoEditorSDK />

          

          

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Pricing;
