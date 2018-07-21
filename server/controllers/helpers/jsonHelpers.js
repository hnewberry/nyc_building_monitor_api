module.exports = {
  constructCensusTractJson: (data, boroughData) => {
    return {
      features: data.map(row => {
        return {
          type: 'Feature',
          geometry: row.geometry,
          properties: {
            id: row,
            name: row.name,
            parentBoundaryName: row.neighborhood.name,
            topParentBoundaryName: boroughData.filter(borough => borough.id === data.borough_id).name,
            incomeMedian2017: parseFloat((row.income || {}).median_income_2017),
            rentMedian2017: parseFloat((row.rent || {}).median_rent_2017),
            racePercentWhite2010: (row.racial_makeup || {}).percent_white_2010,
            buildingsTotal: parseFloat(row.total_buildings),
            serviceCallsPercentOpenOneMonth: parseFloat(
              (row.total_service_calls_open_over_month / row.total_service_calls) * 100
            ).toFixed(2),
            violationsPerBuilding: parseFloat((row.total_violations / row.total_buildings).toFixed(2)),
            representativePoint: row.representative_point
            // rentChange20112017: {
            //   label: 'Rent Change',
            //   value: parseFloat((row.rent || {}).median_rent_change_2011_2017)
            // },
            // salesTotal: { label: 'Total Sales', value: parseFloat(row.total_sales) },
            // permitsTotal: { label: 'Total New Building Permits', value: parseFloat(row.total_permits) },
            // serviceCallsTotal: { label: 'Total 311 Calls', value: parseFloat(row.total_service_calls) },
            // serviceCallsPercentWithViolation: parseFloat(
            //   ((row.total_service_calls_with_violation_result / row.total_service_calls) * 100).toFixed(2)
            // ),
            // serviceCallsPercentNoAction: parseFloat(
            //   ((row.total_service_calls_with_no_action_result / row.total_service_calls) * 100).toFixed(2)
            // ),
            // serviceCallsPercentUnresolved: parseFloat(
            //   ((row.total_service_calls_unresolved_result / row.total_service_calls) * 100).toFixed(2)
            // ),
            // salesTotalPriorViolations: parseFloat(row.total_sales_prior_violations),
            // salesPercentPriorViolations: parseFloat(
            //   ((row.total_sales_prior_violations / row.total_sales) * 100).toFixed(2)
            // ),
            // violationsAverageBeforeSalePerBuilding: parseFloat(row.avg_violation_count_3years_before_sale),
            // violationsTotal: { label: 'Total Violations', value: parseFloat(row.total_violations) },
            // violationsNonCommunityPerBuilding: parseFloat(
            //   ((row.total_violations - row.total_service_calls_with_violation_result) / row.total_buildings).toFixed(2)
            // ),
            // violationsPercentNonCommunity: parseFloat(
            //   (row.total_service_calls_with_violation_result / row.total_violations).toFixed(2) * 100
            // )
          }
        }
      })
    }
  },
  constructBuildingJson: data => {
    return {
      features: data.map(row => {
        return {
          type: 'Feature',
          geometry: JSON.parse(row['geometry']),
          properties: {
            id: { label: 'Id', value: row.id },
            name: { label: 'Address', value: row.address },
            parentBoundaryName: { label: 'Neighborhood', value: row.neighborhood.name },
            topParentBoundaryName: { label: 'Borough', value: row.borough.name },
            yearBuild: { label: 'Year Build', value: row.yearBuilt },
            violationsTotal: { label: 'Total Violations', value: row.totalViolations },
            salesTotal: { label: 'Total Sales', value: row.totalSales },
            serviceCallsTotal: { label: 'Total 311 Calls', value: row.totalServiceCalls },
            serviceCallsPercentOpenOneMonth: {
              label: '311 Calls Open ( > 1 Month)',
              value: row.totalServiceCallsOpenOverMonth
            }
          }
        }
      })
    }
  },
  constructViolationJson: data => {
    return {
      features: data.map(row => {
        return {
          type: 'Feature',
          properties: {
            name: { label: 'Id', value: row.unique_key },
            parentBoundaryName: { label: 'Address', value: row.building.address },
            source: { label: 'Source', value: row.source },
            date: { label: 'Date', value: row.date },
            description: { label: 'Description', value: row.description },
            penalty: { label: 'Penalty', value: row.penaltyImposed }
          }
        }
      })
    }
  },
  constructServiceCallJson: data => {
    return {
      features: data.map(row => {
        return {
          type: 'Feature',
          properties: {
            name: { label: 'Id', value: row.violation_id },
            parentBoundaryName: { label: 'Address', value: row.building.address },
            source: { label: 'Source', value: row.source },
            status: { label: 'Status', value: row.status },
            date: { label: 'Date', value: row.date },
            description: { label: 'Description', value: row.description },
            resolutionDescription: { label: 'Resolution Description', value: row.resolutionDescription },
            resolutionViolation: { label: 'Resulted in violation', value: row.resolutionViolation },
            resolutionNoAction: { label: 'Resulted in no action', value: row.resolutionNoAction },
            resolutionUnableToInvestigate: { label: 'Unable to investigate', value: row.unableToInvestigate },
            openOverMonth: { label: 'Open for over 1 month', value: row.openOverMonth },
            daysToResolve: { label: 'Days to Resolve', value: row.daysToClose }
          }
        }
      })
    }
  },
  constructSaleJson: data => {
    return {
      features: data.map(row => {
        return {
          type: 'Feature',
          properties: {
            name: { label: 'Id', value: row.building.address },
            date: { label: 'Date', value: row.date },
            price: { label: 'Price', value: row.price }
          }
        }
      })
    }
  }
}