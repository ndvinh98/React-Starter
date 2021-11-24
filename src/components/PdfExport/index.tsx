import React from 'react';
import '@assets/css/pdfExport.css';

function PdfExport({
  nameOfCompany,
  natureOfBusiness,
}: {
  nameOfCompany: string;
  natureOfBusiness: string;
}) {
  return (
    <div
      style={{width: '210mm', height: '297mm', padding: '20px'}}
      className="c44">
      <div>
        <p className="c33">
          <span style={{fontSize: '18px'}} className="c2">
            CO-CONFIDENTIAL
          </span>
        </p>
      </div>
      <p className="c33">
        <span style={{fontSize: '18px'}} className="c29">
          Customer Form
        </span>
      </p>
      <p className="c38">
        <span className="c2"></span>
      </p>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <table className="c42">
          <tbody>
            <tr className="c13">
              <td className="c28" colSpan={5} rowSpan={1}>
                <p className="c5">
                  <span className="c22 c37">Section A </span>
                </p>
              </td>
            </tr>
            <tr className="c21">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Name of Company</span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3">
                  <span className="c2">{nameOfCompany}</span>
                </p>
              </td>
            </tr>
            <tr className="c12">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Registered Business Address</span>
                </p>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c34">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Country of Incorporation</span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c34">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Nature of Business</span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3">
                  <span className="c2">{natureOfBusiness}</span>
                </p>
              </td>
            </tr>
            <tr className="c13">
              <td className="c28" colSpan={5} rowSpan={1}>
                <p className="c5">
                  <span className="c22 c39">Section B</span>
                </p>
              </td>
            </tr>
            <tr className="c21">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Name of Company&rsquo;s </span>
                </p>
                <p className="c5">
                  <span className="c22">CEO or equivalent * </span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
                <p className="c5">
                  <span className="c36">&nbsp;</span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c7" colSpan={1} rowSpan={6}>
                <p className="c5">
                  <span className="c9">Names of Top 3 Shareholders *</span>
                </p>
              </td>
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">1.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">2.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">3.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">4.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">5.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">6.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c7" colSpan={1} rowSpan={8}>
                <p className="c5">
                  <span className="c9">Names of All Directors *</span>
                </p>
              </td>
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">1.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">2.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">3.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">4.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">5.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">6.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">7.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c16">
              <td className="c17" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c2">8.</span>
                </p>
              </td>
              <td className="c0" colSpan={3} rowSpan={1}>
                <p className="c3">
                  <span className="c2"></span>
                </p>
              </td>
            </tr>
            <tr className="c31">
              <td className="c40" colSpan={5} rowSpan={1}>
                <p className="c5">
                  <span className="c45">
                    * Indicate the source of information on the Company&rsquo;s
                    CEO or equivalent, Shareholders and Directors, e.g. ACRA
                  </span>
                </p>
              </td>
            </tr>
            <tr className="c12">
              <td className="c30" colSpan={5} rowSpan={1}>
                <p className="c3">
                  <span className="c9"></span>
                </p>
                <p className="c5">
                  <span className="c9">
                    Along with this Customer Form, please attach the following:
                  </span>
                </p>
                <ol className="c18 lst-kix_list_2-0 start" start={1}>
                  <li className="c5 c32 li-bullet-0">
                    <span className="c9">
                      Company&rsquo;s last signed audited financial statement,
                      and
                    </span>
                  </li>
                  <li className="c5 c32 li-bullet-0">
                    <span className="c9">
                      Company&rsquo;s business registry
                    </span>
                  </li>
                </ol>
              </td>
            </tr>
            <tr className="c13">
              <td className="c28" colSpan={5} rowSpan={1}>
                <p className="c5">
                  <span className="c22 c39">Section C</span>
                </p>
              </td>
            </tr>
            <tr className="c12">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Billing Address</span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3">
                  <span className="c9"></span>
                </p>
              </td>
            </tr>
            <tr className="c12">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">
                    Person to contact &amp; attention payment
                  </span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3" id="h.gjdgxs">
                  <span className="c9"></span>
                </p>
              </td>
            </tr>
            <tr className="c12">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Designation</span>
                </p>
              </td>
              <td className="c14" colSpan={4} rowSpan={1}>
                <p className="c3">
                  <span className="c9"></span>
                </p>
              </td>
            </tr>
            <tr className="c12">
              <td className="c7" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Telephone Number</span>
                </p>
              </td>
              <td className="c41" colSpan={2} rowSpan={1}>
                <p className="c3">
                  <span className="c9"></span>
                </p>
              </td>
              <td className="c15" colSpan={1} rowSpan={1}>
                <p className="c5">
                  <span className="c9">Fax Number</span>
                </p>
              </td>
              <td className="c15" colSpan={1} rowSpan={1}>
                <p className="c3">
                  <span className="c9"></span>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="c43">
        <span className="c20"></span>
      </p>
    </div>
  );
}

export default PdfExport;
