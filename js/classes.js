function User(username, pass, ho, ten, email, products, donhang) {
	this.ho = ho || '';
	this.ten = ten || '';
	this.email = email || '';

	this.username = username;
	this.pass = pass;
	this.products = products || [];
	this.donhang = donhang || [];
}

function equalUser(u1, u2) {
	return (u1.username == u2.username && u1.pass == u2.pass);
}

function Promo(name, value) { 
	this.name = name;
	this.value = value;

	this.toWeb = function () {
		if (!this.value) return "";
		var contentLabel = "";
		switch (this.value) {
			case "giamgia":
				contentLabel = `<i class="fa fa-bolt"></i> Giảm ` + this.value + ``;
				break;

			// case "tragop":
			// 	contentLabel = `Trả góp ` + this.value + `%`;
			// 	break;
			case "pharmacity":
				contentLabel = `Pharmacity`;
				break;

			case "medigo":
				contentLabel = `Medigo`;
				break;	
			
			case "longchau":
				contentLabel = `Nhà thuốc Long Châu`;
				break;	

			case "giareonline":
				contentLabel = `Thiết bị y tế`;
				break;

			case "sosanhgia":
				contentLabel = "So sánh giá";
				break;

			case "tragop":
				contentLabel = "Thực phẩm chức năng";
				break;
		} 

		var label =
			`<label class=` + this.name + `>
			` + contentLabel + `
		</label>`;

		return label;
	}
}

function Product(masp, name, img, price, star, rateCount, promo, link) {
	this.masp = masp;
	this.img = img;
	this.name = name;
	this.price = price;
	this.star = star;
	this.rateCount = rateCount;
	this.promo = promo;
	this.link = link;
}

function addToWeb(p, ele, returnString) {
	// Chuyển star sang dạng tag html
	var rating = "";
	if (p.rateCount > 0) {
		for (var i = 1; i <= 5; i++) {
			if (i <= p.star) {
				rating += `<i class="fa fa-star"></i>`
			} else {
				rating += `<i class="fa fa-star-o"></i>`
			}
		}
		rating += `<span>` + p.rateCount + ` đánh giá</span>`;
	}

	// Chuyển giá tiền sang dạng tag html
	var price = `<strong>` + p.price + `</strong>`;


	// tách theo dấu ' ' vào gắn lại bằng dấu '-', code này giúp bỏ hết khoảng trắng và thay vào bằng dấu '-'.
	// Tạo link tới chi tiết sản phẩm, chuyển tất cả ' ' thành '-'
	

	// Cho mọi thứ vào tag <li>... </li>
	var newLi =
	`<li class="sanPham">
		<a onclick="themVaoGioHang('`+p.link+`'); return false;">
			<img src=` + p.img + ` alt="">
			<h3>` + p.name + `</h3>
			<div class="price">
				` + price + `
			</div>
			<div class="ratingresult">
				` + rating + `
			</div>
			` + (p.promo && p.promo.toWeb()) + `
			<div class="tooltip">
				<button class="themvaogio" onclick="themVaoGioHang('`+p.link+`'); return false;">
					<span class="tooltiptext" style="font-size: 15px;">Xem chi tiết</span>
					→
				</button>
			</div>
		</a>
	</li>`;

	if(returnString) return newLi;

	// Thêm tag <li> vừa tạo vào <ul> homeproduct (mặc định) , hoặc tag ele truyền vào
	var products = ele || document.getElementById('products');
	products.innerHTML += newLi;
}