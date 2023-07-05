
export const OfficeCard = ({ office }) => {
  return (
    <div className='col m-1 d-flex flex-column justify-content-center align-items-center rounded-3 degrade-ld-back text-light p-2'>
      <h2 className='mb-2'>Actual amount in {office.name}</h2>
      <span className="ps-5 pe-5 border rounded-1 bg-light primary-color fw-bold h3">{office.amount}</span>
    </div>
  );
};
