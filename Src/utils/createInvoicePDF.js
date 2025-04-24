import RNFetchBlob from 'rn-fetch-blob';
import { DocumentRenderer, Page, Text, Font } from 'react-native-pdf-lib'; // If you choose a library for generating PDFs

export const createInvoicePDF = async (order) => {
  try {
    const { dirs } = RNFetchBlob.fs;
    const path = dirs.DocumentDir + `/invoice_${order._id}.pdf`;

    // Create the PDF document
    const doc = new DocumentRenderer();

    doc.addPage(Page)
      .addText(`Invoice for Order #${order._id}`, { fontSize: 24, color: '#000' })
      .addText(`Total Price: ₹${order.cloths.reduce((acc, item) => acc + item.totalPrice, 0)}`, { fontSize: 16 })
      .addText(`Pickup Date: ${order.pickupDate}`, { fontSize: 16 })
      .addText(`Pickup Time: ${order.pickupTime}`, { fontSize: 16 });

    // Write out the PDF to file system
    const result = await doc.save(path);

    return result; // Return the path to the generated invoice
  } catch (error) {
    console.error('Error generating invoice:', error);
    throw error;
  }
};
