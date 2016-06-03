/*
Requirement:
es6-promise, https://github.com/stefanpenner/es6-promise
jQuery, https://github.com/jquery/jquery
*/

function showModalDialog(url, args, options) {
  options = options || {};

  return new Promise(function (fullfil, fail) {

		var cover = $('<div>')
      .attr('id','sMD_Cover') // add id for reference
			.addClass('sMD_Cover')
			.appendTo(document.body);

		sMD_SetCoverHeight(); // use javascript to calculate the height of this DIV container

		var cover = $('<div>')
			.addClass('sMD_Cover')
			.appendTo(cover);

		var content = $('<div>')
			.addClass('sMD_Dialog')
			.css({
				width: options.width || '50%',
				height: options.height || '50%',
				left: options.left || '25%',
				top: options.top || '25%',
				display: 'none'
			})
			.appendTo(document.body);

		var iframe = $('<iframe>').appendTo(content).attr("src", url)
			.on("load", function () {
				content.css({ display: 'block' });
			});

    // Completely remove all components. So that the modal dialog can be stacked up
		var close = function () {
		  $('iframe').remove('.sMD_Dialog');
		  $('div').remove('.sMD_Dialog');
		  $('div').remove('.sMD_Cover');
			};

		showModalDialog.dialogArguments = args;
		showModalDialog.returnValue = function (v) {
			close();
			fullfil(v);
		};

		showModalDialog.cancel = function () {
			close();
			fail();
		};

  });
}

function sMD_SetCoverHeight()
{
  // ��������ø���DIV�ĸ߶ȡ�CSS���������˶��������Ȼֻ�ܸ���viewport��Χ�����ܸ�������ҳ�档
  var body = document.body,
      html = document.documentElement;

  var height = Math.max( body.scrollHeight, body.offsetHeight,
                         html.clientHeight, html.scrollHeight, html.offsetHeight );
  document.getElementById('sMD_Cover').style.height = height+'px';
}