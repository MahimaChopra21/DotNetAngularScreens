using System;
using System.Data;
using System.Data.SqlClient;

namespace DataSet
{
    public class DataBaseModel
    {


        string connectionString = @"Data Source=192.168.12.20; Initial Catalog = Training2019; Integrated Security=False;User ID=qancs_imarc;Password=qancs#2019";


        public DataTable GetResults(string sqlQuery)
        {
            SqlConnection sqlCon = new SqlConnection(connectionString);
            sqlCon.Open();
            DataTable DtResult = new DataTable();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(sqlQuery, sqlCon);
            sqlDataAdapter.Fill(DtResult);
            return DtResult;
        }

        public DataTable PostValues(string sqlQuery)
        {
            SqlConnection sqlCon = new SqlConnection(connectionString);
            sqlCon.Open();
            SqlCommand sqlCommand = new SqlCommand(sqlQuery, sqlCon);
            sqlCommand.ExecuteNonQuery();
            return null;

        }
        public DataTable StoreProcedureQuery(string storeProcedureMethod)
        {
            DataTable Dtresult = new DataTable();
            SqlConnection sqlCon = new SqlConnection(connectionString);
            sqlCon.Open();

            SqlCommand sqlCommand = new SqlCommand(storeProcedureMethod, sqlCon);
            sqlCommand.CommandType = CommandType.StoredProcedure;
            Dtresult.Load(sqlCommand.ExecuteReader());

            return Dtresult;
        }

        //public void StoreProcedureQuery(string storeProcedureMethod, DBDataModel dbDataModel)
        public DataTable StoreProcedureSearchQuery(string storeProcedureMethod, object property)
        {
            DataTable Dtresult = new DataTable();
            //DataTable Dtresult = new DataTable();
            SqlConnection sqlCon = new SqlConnection(connectionString);
            sqlCon.Open();
            SqlCommand sqlCommand = new SqlCommand(storeProcedureMethod, sqlCon);
            sqlCommand.CommandType = CommandType.StoredProcedure;

            foreach (var parameter in property.GetType().GetProperties())
            {
                var commandParameter = sqlCommand.CreateParameter();
                commandParameter.ParameterName = "@" + parameter.Name;
                commandParameter.Value = parameter.GetValue(property);
                sqlCommand.Parameters.Add(commandParameter);
            }
            Dtresult.Load(sqlCommand.ExecuteReader());

            return Dtresult;
        }

        public void StoreProcedureOtherQuery(string storeProcedureMethod, object property)
        {
            DataTable Dtresult = new DataTable();
            //DataTable Dtresult = new DataTable();
            SqlConnection sqlCon = new SqlConnection(connectionString);
            sqlCon.Open();

            SqlCommand sqlCommand = new SqlCommand(storeProcedureMethod, sqlCon)
            {
                CommandType = CommandType.StoredProcedure
            };

            foreach (var parameter in property.GetType().GetProperties())
            {
                var commandParameter = sqlCommand.CreateParameter();
                commandParameter.ParameterName = "@" + parameter.Name;
                commandParameter.Value = parameter.GetValue(property);
                sqlCommand.Parameters.Add(commandParameter);
            }

            sqlCommand.ExecuteNonQuery();



        }
    }
}
