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
      showCloseButton: 'false',
      sticker: {
        enableCustomUpload: true, // true is the default
        customStickerTintMode: "colorized", // 'none' is the default
          flattenCategories: true,
          categories: [
            {
              identifier: "some_category",
              name: "Some Category",
              thumbnailURI: "../../../assets/Border_Angled_Wht.png", // path to the sticker, relative to the sticker asset directory
              items: [
                {
                  identifier: "custom_sticker",
                  name: "Custom Sticker",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Border_Round_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Border_Round_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker2",
                  name: "Custom Sticker2",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Border_Triangle_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Border_Triangle_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker3",
                  name: "Custom Sticker3",
                  thumbnailURI: "../../../assets/sticker/shapes/base/DashedLine_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/DashedLine_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker4",
                  name: "Custom Sticker4",
                  thumbnailURI: "../../../assets/sticker/shapes/base/DottedLine_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/DottedLine_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker5",
                  name: "Custom Sticker5",
                  thumbnailURI: "../../../assets/sticker/shapes/base/HandDrawnArrow_Curve_A_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/HandDrawnArrow_Curve_A_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker6",
                  name: "Custom Sticker6",
                  thumbnailURI: "../../../assets/sticker/shapes/base/HandDrawnArrow_Curve_B_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/HandDrawnArrow_Curve_B_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker7",
                  name: "Custom Sticker7",
                  thumbnailURI: "../../../assets/sticker/shapes/base/HandDrawnArrow_Straight_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/HandDrawnArrow_Straight_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "none", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker8",
                  name: "Custom Sticker8",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Oval_Rectangle_Long_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Oval_Rectangle_Long_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker9",
                  name: "Custom Sticker9",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Oval_Rectangle_Short_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Oval_Rectangle_Short_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker10",
                  name: "Custom Sticker10",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Oval_Shape_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Oval_Shape_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker11",
                  name: "Custom Sticker11",
                  thumbnailURI: "../../../assets/sticker/shapes/base/PaintBrushStroke_A_Long_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/PaintBrushStroke_A_Long_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker12",
                  name: "Custom Sticker12",
                  thumbnailURI: "../../../assets/sticker/shapes/base/PaintBrushStroke_A_Short_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/PaintBrushStroke_A_Short_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker13",
                  name: "Custom Sticker13",
                  thumbnailURI: "../../../assets/sticker/shapes/base/PaintBrushStroke_B_Long_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/PaintBrushStroke_B_Long_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker14",
                  name: "Custom Sticker14",
                  thumbnailURI: "../../../assets/sticker/shapes/base/PaintBrushStroke_B_Short_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/PaintBrushStroke_B_Short_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker15",
                  name: "Custom Sticker15",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Rectangle_AngledEdges_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Rectangle_AngledEdges_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker16",
                  name: "Custom Sticker16",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Rectangle_CurveInEdge_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Rectangle_CurveInEdge_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker17",
                  name: "Custom Sticker17",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Rectangle_CurveOutEdge_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Rectangle_CurveOutEdge_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker18",
                  name: "Custom Sticker18",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Rectangle_Long_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Rectangle_Long_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },
                {
                  identifier: "custom_sticker19",
                  name: "Custom Sticker19",
                  thumbnailURI: "../../../assets/sticker/shapes/base/Rectangle_Short_Wht.png", // path to the thumbnail, relative to the sticker asset directory
                  stickerURI: "../../../assets/sticker/shapes/Rectangle_Short_Wht.svg", // path to the sticker, relative to the sticker asset directory
                  tintMode: "colorized", // Default: 'none', Other options: 'solid', 'colorized'
                  resizeMode: "keepAspect", // Default: 'keepAspect', Other options:: 'keepAspect', 'unrestricted'
                },

              ],
            },
            // {
              // identifier: "imgly_sticker_emoticons",
              // items: [
                // { identifier: "imgly_sticker_emoticons_grin" },
                // { identifier: "imgly_sticker_emoticons_laugh" },
                // { identifier: "imgly_sticker_emoticons_smile" },
                // { identifier: "imgly_sticker_emoticons_wink" },
                // { identifier: "imgly_sticker_emoticons_tongue_out_wink" },
                // { identifier: "imgly_sticker_emoticons_angel" },
                // { identifier: "imgly_sticker_emoticons_kisses" },
                // { identifier: "imgly_sticker_emoticons_loving" },
                // { identifier: "imgly_sticker_emoticons_kiss" },
                // { identifier: "imgly_sticker_emoticons_wave" },
                // { identifier: "imgly_sticker_emoticons_nerd" },
                // { identifier: "imgly_sticker_emoticons_cool" },
                // { identifier: "imgly_sticker_emoticons_blush" },
                // { identifier: "imgly_sticker_emoticons_duckface" },
                // { identifier: "imgly_sticker_emoticons_furious" },
                // { identifier: "imgly_sticker_emoticons_angry" },
                // { identifier: "imgly_sticker_emoticons_steaming_furious" },
                // { identifier: "imgly_sticker_emoticons_sad" },
                // { identifier: "imgly_sticker_emoticons_anxious" },
                // { identifier: "imgly_sticker_emoticons_cry" },
                // { identifier: "imgly_sticker_emoticons_sobbing" },
                // { identifier: "imgly_sticker_emoticons_loud_cry" },
                // { identifier: "imgly_sticker_emoticons_wide_grin" },
                // { identifier: "imgly_sticker_emoticons_impatient" },
                // { identifier: "imgly_sticker_emoticons_tired" },
                // { identifier: "imgly_sticker_emoticons_asleep" },
                // { identifier: "imgly_sticker_emoticons_sleepy" },
                // { identifier: "imgly_sticker_emoticons_deceased" },
                // { identifier: "imgly_sticker_emoticons_attention" },
                // { identifier: "imgly_sticker_emoticons_question" },
                // { identifier: "imgly_sticker_emoticons_not_speaking_to_you" },
                // { identifier: "imgly_sticker_emoticons_sick" },
                // { identifier: "imgly_sticker_emoticons_pumpkin" },
                // { identifier: "imgly_sticker_emoticons_boxer" },
                // { identifier: "imgly_sticker_emoticons_idea" },
                // { identifier: "imgly_sticker_emoticons_smoking" },
                // { identifier: "imgly_sticker_emoticons_beer" },
                // { identifier: "imgly_sticker_emoticons_skateboard" },
                // { identifier: "imgly_sticker_emoticons_guitar" },
                // { identifier: "imgly_sticker_emoticons_music" },
                // { identifier: "imgly_sticker_emoticons_sunbathing" },
                // { identifier: "imgly_sticker_emoticons_hippie" },
                // { identifier: "imgly_sticker_emoticons_humourous" },
                // { identifier: "imgly_sticker_emoticons_hitman" },
                // { identifier: "imgly_sticker_emoticons_harry_potter" },
                // { identifier: "imgly_sticker_emoticons_business" },
                // { identifier: "imgly_sticker_emoticons_batman" },
                // { identifier: "imgly_sticker_emoticons_skull" },
                // { identifier: "imgly_sticker_emoticons_ninja" },
                // { identifier: "imgly_sticker_emoticons_masked" },
                // { identifier: "imgly_sticker_emoticons_alien" },
                // { identifier: "imgly_sticker_emoticons_wrestler" },
                // { identifier: "imgly_sticker_emoticons_devil" },
                // { identifier: "imgly_sticker_emoticons_star" },
                // { identifier: "imgly_sticker_emoticons_baby_chicken" },
                // { identifier: "imgly_sticker_emoticons_rabbit" },
                // { identifier: "imgly_sticker_emoticons_pig" },
                // { identifier: "imgly_sticker_emoticons_chicken" },
              // ],
           // },
            {
              identifier: "imgly_sticker_shapes",
              items: [
                { identifier: "imgly_sticker_shapes_badge_01" },
                { identifier: "imgly_sticker_shapes_badge_04" },
                { identifier: "imgly_sticker_shapes_badge_12" },
                { identifier: "imgly_sticker_shapes_badge_06" },
                { identifier: "imgly_sticker_shapes_badge_13" },
                { identifier: "imgly_sticker_shapes_badge_36" },
                { identifier: "imgly_sticker_shapes_badge_08" },
                { identifier: "imgly_sticker_shapes_badge_11" },
                { identifier: "imgly_sticker_shapes_badge_35" },
                { identifier: "imgly_sticker_shapes_badge_28" },
                { identifier: "imgly_sticker_shapes_badge_32" },
                { identifier: "imgly_sticker_shapes_badge_15" },
                { identifier: "imgly_sticker_shapes_badge_20" },
                { identifier: "imgly_sticker_shapes_badge_18" },
                { identifier: "imgly_sticker_shapes_badge_19" },
                { identifier: "imgly_sticker_shapes_arrow_02" },
                { identifier: "imgly_sticker_shapes_arrow_03" },
                { identifier: "imgly_sticker_shapes_spray_01" },
                { identifier: "imgly_sticker_shapes_spray_04" },
                { identifier: "imgly_sticker_shapes_spray_03" },
              ],
            },
          ],
      },
      container: '#editor',
      layout: 'advanced',
      theme: 'light',
      library: {
        enableWebcam: true, // Disables the webcam
        enableUpload: true, // Disables the upload
      },
      
      enableUpload: 'true',
      
      image: '../../../../example.jpg', // Image url or Image path relative to assets folder
      license: '{"api_token":"aD2qInSfuAN-SqKZYu-z6g","app_identifiers":["localhost","caucus.digital","www.caucus.digital"],"available_actions":[],"domains":["https://api.photoeditorsdk.com"],"enterprise_license":false,"expires_at":null,"features":["camera","library","export","customassets","whitelabel","adjustment","sticker","text","textdesign","transform"],"issued_at":1617683144,"minimum_sdk_version":"1.0","owner":"MADDIE LEE BRADFORD","platform":"HTML5","products":["pesdk"],"version":"2.4","signature":"UrG8hCvqnf2JdLknGA0glpDxv0LDdI7GhktUluasiUDf4zdzQmEhFMkijihCYmXcPcnFx3lCmLP7O8t5AQMUGNWyr4sVh5kx5UpC/RW1zrUQ7tOIQFivbVfCla/k8rz/e0MMDo9EcPsYVta2VCibV/Bp8ijiiBNU0Ey75OONewXdEfeyfWbNYfMcWnnSp6516gF3q7QeU9JActAq8HKZTYQFWL+mCzS/1dsoqrDYbr4pGFmwvkTJZDum7fw6OnGUthsV+g+q8q3rvj8Q3iyD2dd3vaBev/3Iupql9EAB3F2cZ7bzgBVftBEV3H2P5VwMtO61b+NnJdS2GdhdVNpHKwh6uQzNF7KhWqwczo8hTbzMsnyRo/OdJB/XpPNb/gdhaq+/ZDqVrBbbqbY5EWeWEIdStvLEiyUWM9oT5U19AwirjNkOxu1/WZEuhpheopYLc+AVddHLnTGFL0UjQUMb9LKPEL6vxlZuKAO1/SdbCplL+2iXnNJ/Iqmwk0KFx4qK3KPCWk05co5WoQJgsOZVMXzDqSg/6xH/ajiPPQdtlBFXUfEcPQIjOZ75hhEd1KF9EjHNaqUrFiC+R1bbWeOUrjl6LPavac/SQ7b+GUhherIMVQKudXtsbDUURFRPzlpyxrtuYtoHO8uGB7lEuPUZOguyspkUqVZXyycXqLkfbsQ="}',   
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

function Typography() {
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

export default Typography;
