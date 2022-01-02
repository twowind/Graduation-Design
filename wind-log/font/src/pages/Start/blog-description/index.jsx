import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class BlogDesCription extends Component {

    originalDescription = "欢迎访问wind-log。"

    state = {
        description: ""
    }

    componentDidMount() {
        this.fontShow()
    }


    fontShow = () => {
        //博客文字描述逐个显示
        let i = 1;
        this.timer = setInterval(
            () => {
                let { description } = this.state;
                description = this.originalDescription.substr(0, i);
                this.setState({ description });
                i++;
                if (i === this.originalDescription.length + 1) {
                    clearInterval(this.timer);
                }
            }, 50
        )
    }

    render() {

        const settings = {
            focusOnSelect: true,
            infinite: true,
            vertical: true,
            verticalSwiping: true,
            autoplay: true,
            lazyLoad: true,
            speed: 500,
            autoplaySpeed: 2000,
            pauseOnHover: true,
            adaptiveHeight: true,
            arrows: false
        }

        return (
            <div style={{ float: 'left' }}>
                <div style={{ margin: '80px 0 0 60px', height: 200 }} onClick={this.fontShow}>
                    <span style={{ fontSize: 30, color: 'seashell' }}>{this.state.description}</span>
                </div>
                <div style={{ marginLeft: 80 }}>
                    <Slider style={{ width: '50vh' }} {...settings}  >
                        <div>
                            <img
                                style={{ width: 600, height: 300 }}
                                alt="es-lint want to get"
                                src="https://backiee.com/static/wpdb/wallpapers/1000x563/299001.jpg"
                            />
                        </div>
                        <div>
                            <img
                                style={{ width: 600, height: 300 }}
                                alt="es-lint want to get"
                                src="https://backiee.com/static/wpdb/wallpapers/560x315/299142.jpg"
                            />
                        </div>
                        <div>
                            <img
                                style={{ width: 600, height: 300 }}
                                alt="es-lint want to get"
                                src="https://backiee.com/static/wpdb/wallpapers/560x315/299132.jpg"
                            />
                        </div>
                    </Slider>
                </div>


            </div>

        )
    }
}
