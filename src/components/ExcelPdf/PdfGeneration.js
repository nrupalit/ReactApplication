import pdfMake from 'pdfmake/build/pdfmake';
import vfsFonts from 'pdfmake/build/vfs_fonts'


export const generatedPdf=(content,name)=>{
    const {vfs} = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;
    let data={
        columns: [
       
            {
                image: 'data:image/png;base64,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'
                ,width: 45
                ,height:20
            },
          {
            width: 'auto',
            text: 'First column'
          },
          {
            width: '*',
            text: 'Second column'
          },
          {
            width: 100,
            text: 'Third column'
          },
          {
            width: '10%',
            text: 'Last column'
          }
        ],
        columnGap: 10
      }
   
  
  var docDefinition = { content: [data] };
 // open the PDF in a new window
//  pdfMake.createPdf(docDefinition).open();

//  // print the PDF
//  pdfMake.createPdf(docDefinition).print();

 // download the PDF
 pdfMake.createPdf(docDefinition).download(`${name}.pdf`);



}
//examples sample
// var docDefinition = {
//     content: [
//       // if you don't need styles, you can use a simple string to define a paragraph
//       'This is a standard paragraph, using default style',
 
//       // using a { text: '...' } object lets you set styling properties
//       { text: 'This paragraph will have a bigger font', fontSize: 15 },
 
//       // if you set pass an array instead of a string, you'll be able
//       // to style any fragment individually
//       {
//         text: [
//           'This paragraph is defined as an array of elements to make it possible to ',
//           { text: 'restyle part of it and make it bigger ', fontSize: 15 },
//           'than the rest.'
//         ]
//       }
//     ]
//   };
// var docDefinition = {
//     content: [
//       'This paragraph fills full width, as there are no columns. Next paragraph however consists of three columns',
//       {
//         columns: [
//           {
//             // auto-sized columns have their widths based on their content
//             width: 'auto',
//             text: 'First column'
//           },
//           {
//             // star-sized columns fill the remaining space
//             // if there's more than one star-column, available width is divided equally
//             width: '*',
//             text: 'Second column'
//           },
//           {
//             // fixed width
//             width: 100,
//             text: 'Third column'
//           },
//           {
//             // percentage width
//             width: '10%',
//             text: 'Last column'
//           }
//         ],
//         // optional space between columns
//         columnGap: 10
//       },
//       'This paragraph goes below all columns and has full width'
//     ]
//   };










